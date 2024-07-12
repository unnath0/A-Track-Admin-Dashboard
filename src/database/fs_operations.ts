import { db } from './firebase';
import { collection, doc, query, where, getDocs, Timestamp, setDoc } from 'firebase/firestore';
import { AttendanceDocument } from '../types/product';

// Add a document to a collection
export const addDocument = async (
  collection_name: string,
  document: Record<string, any>,
): Promise<void> => {
  try {
    // await addDoc(collection(db, collection_name), document);
    const newDocRef = doc(collection(db, collection_name));
    await setDoc(newDocRef, document);
    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

// Add 10 dummy documents to a collection
export const addDummyDocuments = async (
  collection_name: string,
  dummyDocuments: Record<string, any>[],
): Promise<void> => {
  try {
    const promises = dummyDocuments.map((doc) => addDocument(collection_name, doc));
    await Promise.all(promises);
    console.log('Dummy documents successfully written!');
  } catch (error) {
    console.error('Error writing dummy documents: ', error);
  }
};

export const getAttendanceByDate = async (date: string): Promise<AttendanceDocument[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const attendanceList: AttendanceDocument[] = [];

  try {
    const q = query(
      collection(db, "attendance_details"),
      where("time", ">=", startOfDay),
      where("time", "<=", endOfDay)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const attendanceDoc: AttendanceDocument = {
        id: doc.id,
        name: data.name, // Replace with your actual field name for employee name
        dept: data.dept, // Replace with your actual field name for department
        type: data.type, // Replace with your actual field name for type of attendance
        time: data.time.toDate().toISOString() // Adjust this to format your timestamp as needed
      };
      attendanceList.push(attendanceDoc);
    });

    return attendanceList;
    console.log(attendanceList);
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error; // Optionally re-throw or handle the error accordingly
  }
};


// Get attendance details for a particular date and department
export const getAttendanceByDateAndDept = async (
  date: string,
  dept: string,
): Promise<void> => {
  const startOfDay = Timestamp.fromDate(new Date(new Date(date).setHours(0, 0, 0, 0)));
  const endOfDay = Timestamp.fromDate(new Date(new Date(date).setHours(23, 59, 59, 999)));

  try {
    const q = query(
      collection(db, "attendance_details"),
      where("time", ">=", startOfDay),
      where("time", "<=", endOfDay),
      where("dept", "==", dept)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};

// Get attendance details for a particular empId with no date restriction
export const getAttendanceByEmpId = async (empId: number): Promise<void> => {
  try {
    const q = query(
      collection(db, "attendance_details"),
      where("empId", "==", empId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};
