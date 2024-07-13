import { db } from './firebase';
import { collection, doc, query, where, getDocs, Timestamp, setDoc, GeoPoint } from 'firebase/firestore';
import { AttendanceDocument, UserDocument } from '../types/product';

// Add or update attendance document
export const upsertAttendanceDocument = async (attendance: AttendanceDocument): Promise<void> => {
  try {
    const attendanceRef = doc(collection(db, 'attendance_details'), `${attendance.empId}_${attendance.login.toMillis()}`);
    await setDoc(attendanceRef, attendance, { merge: true });
    console.log('Attendance document successfully written/updated!');
  } catch (error) {
    console.error('Error writing/updating attendance document: ', error);
  }
};

// Add or update user document
export const upsertUserDocument = async (user: UserDocument): Promise<void> => {
  try {
    const userRef = doc(collection(db, 'user_details'), `${user.empId}`);
    await setDoc(userRef, user, { merge: true });
    console.log('User document successfully written/updated!');
  } catch (error) {
    console.error('Error writing/updating user document: ', error);
  }
};

// Fetch attendance by date
export const getAttendanceByDate = async (date: string): Promise<AttendanceDocument[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const attendanceList: AttendanceDocument[] = [];

  try {
    const q = query(
      collection(db, "attendance_details"),
      where("login", ">=", Timestamp.fromDate(startOfDay)),
      where("login", "<=", Timestamp.fromDate(endOfDay))
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as AttendanceDocument;
      attendanceList.push(data);
    });

    console.log(attendanceList);
    return attendanceList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// Get attendance details for a particular date and department
export const getAttendanceByDateAndDept = async (
  date: string,
  dept: string,
): Promise<AttendanceDocument[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const attendanceList: AttendanceDocument[] = [];

  try {
    const q = query(
      collection(db, "attendance_details"),
      where("login", ">=", Timestamp.fromDate(startOfDay)),
      where("login", "<=", Timestamp.fromDate(endOfDay)),
      where("dept", "==", dept)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as AttendanceDocument;
      attendanceList.push(data);
    });

    console.log(attendanceList);
    return attendanceList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// Get attendance details for a particular empId with no date restriction
export const getAttendanceByEmpId = async (empId: number): Promise<AttendanceDocument[]> => {
  const attendanceList: AttendanceDocument[] = [];

  try {
    const q = query(
      collection(db, "attendance_details"),
      where("empId", "==", empId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as AttendanceDocument;
      attendanceList.push(data);
    });

    console.log(attendanceList);
    return attendanceList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};


// Add multiple dummy attendance documents
export const addDummyAttendanceDocuments = async (): Promise<void> => {
  const dummyAttendanceData: AttendanceDocument[] = [
    {
      empId: 1,
      empName: 'John Doe',
      dept: 'CSE',
      login: Timestamp.fromDate(new Date('2024-07-13T08:00:00Z')),
      logout: Timestamp.fromDate(new Date('2024-07-13T17:00:00Z')),
      loc: new GeoPoint(37.7749, -122.4194),
    },
    {
      empId: 2,
      empName: 'Jane Smith',
      dept: 'CSE',
      login: Timestamp.fromDate(new Date('2024-07-13T08:30:00Z')),
      logout: Timestamp.fromDate(new Date('2024-07-13T17:30:00Z')),
      loc: new GeoPoint(37.7749, -122.4194),
    },
    {
      empId: 3,
      empName: 'Alice Johnson',
      dept: 'ECE',
      login: Timestamp.fromDate(new Date('2024-07-13T09:00:00Z')),
      logout: Timestamp.fromDate(new Date('2024-07-13T18:00:00Z')),
      loc: new GeoPoint(37.7749, -122.4194),
    },
    {
      empId: 4,
      empName: 'Alucard',
      dept: 'ISE',
      login: Timestamp.fromDate(new Date('2024-07-13T09:00:00Z')),
      loc: new GeoPoint(37.7749, -122.4194),
    },
    {
      empId: 4,
      empName: 'Alucard',
      dept: 'ISE',
      login: Timestamp.fromDate(new Date('2024-07-13T09:00:00Z')),
      logout: Timestamp.fromDate(new Date('2024-07-13T18:00:00Z')),
      loc: new GeoPoint(37.7749, -122.4194),
    },
    // Add more dummy data as needed
  ];

  try {
    const promises = dummyAttendanceData.map((doc) => upsertAttendanceDocument(doc));
    await Promise.all(promises);
    console.log('Dummy attendance documents successfully written!');
  } catch (error) {
    console.error('Error writing dummy attendance documents: ', error);
  }
};

// Add multiple dummy user documents
export const addDummyUserDocuments = async (): Promise<void> => {
  const dummyUserData: UserDocument[] = [
    {
      empId: 1,
      empName: 'John Doe',
      dept: 'CSE',
      position: 'Staff',
    },
    {
      empId: 2,
      empName: 'Jane Smith',
      dept: 'CSE',
      position: 'Staff',
    },
    {
      empId: 3,
      empName: 'Alice Johnson',
      dept: 'ECE',
      position: 'HOD',
    },
    {
      empId: 4,
      empName: 'Alucard',
      dept: 'ISE',
      position: 'Admin',
    },
    // Add more dummy data as needed
  ];

  try {
    const promises = dummyUserData.map((doc) => upsertUserDocument(doc));
    await Promise.all(promises);
    console.log('Dummy user documents successfully written!');
  } catch (error) {
    console.error('Error writing dummy user documents: ', error);
  }
};
