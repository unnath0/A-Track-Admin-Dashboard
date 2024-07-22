import { db, auth } from './firebase';
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  Timestamp,
  setDoc,
  GeoPoint,
} from 'firebase/firestore';
import { AttendanceDocument, UserDocument } from '../types/product';

// Add or update attendance document
export const upsertAttendanceDocument = async (
  attendance: AttendanceDocument,
): Promise<void> => {
  try {
    const attendanceRef = doc(
      collection(db, 'attendance_details'),
      `${attendance.empId}_${attendance.login.toMillis()}`,
    );
    await setDoc(attendanceRef, attendance, { merge: true });
    console.log('Attendance document successfully written/updated!');
  } catch (error) {
    console.error('Error writing/updating attendance document: ', error);
  }
};

// Add or update user document
export const upsertUserDocument = async (user: UserDocument): Promise<void> => {
  try {
    const userRef = doc(collection(db, 'user_details'), `${user.uid}`);
    await setDoc(userRef, user, { merge: true });
    console.log('User document successfully written/updated!');
  } catch (error) {
    console.error('Error writing/updating user document: ', error);
  }
};

// Fetch list of employees
export const getEmployees = async (): Promise<UserDocument[]> => {
  const employeesList: UserDocument[] = [];

  try {
    const q = query(collection(db, 'user_details'), orderBy('empId'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as UserDocument;
      employeesList.push(data);
    });

    console.log(employeesList);
    return employeesList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

export const getEmployeesByDept = async (
  dept: string,
): Promise<UserDocument[]> => {
  const employeesList: UserDocument[] = [];

  try {
    const q = query(
      collection(db, 'user_details'),
      where('dept', '==', dept),
      orderBy('empId'),
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as UserDocument;
      employeesList.push(data);
    });

    console.log(employeesList);
    return employeesList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// Fetch currently signed in user's details
export const getCurrentEmployeeDetails = async () => {
  try {
    if (auth.currentUser != null) {
      const docRef = doc(db, 'user_details', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      // console.log(docSnap.data());
      // console.log('Type of the query result: ', typeof docSnap.data());
      // console.log('Position: ', docSnap.data().position);
      return docSnap.data();
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
};

// Fetch attendance by date
export const getAttendanceByDate = async (
  date: string,
): Promise<AttendanceDocument[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const attendanceList: AttendanceDocument[] = [];

  try {
    const q = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfDay)),
      where('login', '<=', Timestamp.fromDate(endOfDay)),
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
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfDay)),
      where('login', '<=', Timestamp.fromDate(endOfDay)),
      where('dept', '==', dept),
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
export const getAttendanceByEmpId = async (
  empId: number,
): Promise<AttendanceDocument[]> => {
  const attendanceList: AttendanceDocument[] = [];

  try {
    const q = query(
      collection(db, 'attendance_details'),
      where('empId', '==', empId),
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

// Utility Functions to get Date Ranges
const getCurrentDateRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const getStartOfWeek = () => {
  const start = new Date();
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
};

const getEndOfWeek = () => {
  const end = new Date();
  end.setDate(end.getDate() - end.getDay() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

const getStartOfMonth = () => {
  const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  return start;
};

const getEndOfMonth = () => {
  const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return end;
};

// Function to get total users, optionally filtered by department
const getTotalUsers = async (dept?: string | null) => {
  let q;
  if (dept) {
    q = query(collection(db, 'user_details'), where('dept', '==', dept));
  } else {
    q = query(collection(db, 'user_details'));
  }
  const usersSnapshot = await getDocs(q);
  return usersSnapshot.size;
};

// Function to get total present users, optionally filtered by department
const getTotalPresent = async (dept?: string | null) => {
  const { start, end } = getCurrentDateRange();
  let attendanceQuery;
  if (dept) {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(start)),
      where('logout', '<=', Timestamp.fromDate(end)),
      where('dept', '==', dept),
    );
  } else {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(start)),
      where('logout', '<=', Timestamp.fromDate(end)),
    );
  }
  const attendanceSnapshot = await getDocs(attendanceQuery);
  return attendanceSnapshot.size;
};

// Function to get total absent users, optionally filtered by department
const getTotalAbsent = async (totalUsers: number, dept?: string | null) => {
  const totalPresent = await getTotalPresent(dept);
  return totalUsers - totalPresent;
};

// Function to get late logins, optionally filtered by department
const getLateLogIn = async (dept?: string | null) => {
  const { start, end } = getCurrentDateRange();
  const lateLogInTime = new Date();
  lateLogInTime.setHours(9, 5, 0, 0); // 9:00 AM
  let attendanceQuery;
  if (dept) {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(start)),
      where('login', '<=', Timestamp.fromDate(end)),
      where('login', '>', Timestamp.fromDate(lateLogInTime)),
      where('dept', '==', dept),
    );
  } else {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(start)),
      where('login', '<=', Timestamp.fromDate(end)),
      where('login', '>', Timestamp.fromDate(lateLogInTime)),
    );
  }
  const attendanceSnapshot = await getDocs(attendanceQuery);
  return attendanceSnapshot.size;
};

// Function to get early logouts, optionally filtered by department
const getEarlyLogOut = async (dept?: string | null) => {
  const { start, end } = getCurrentDateRange();
  const earlyLogOutTime = new Date();
  earlyLogOutTime.setHours(17, 0, 0, 0); // 5:00 PM
  let attendanceQuery;
  if (dept) {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(start)),
      where('logout', '<=', Timestamp.fromDate(end)),
      where('logout', '<', Timestamp.fromDate(earlyLogOutTime)),
      where('dept', '==', dept),
    );
  } else {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(start)),
      where('logout', '<=', Timestamp.fromDate(end)),
      where('logout', '<', Timestamp.fromDate(earlyLogOutTime)),
    );
  }
  const attendanceSnapshot = await getDocs(attendanceQuery);
  return attendanceSnapshot.size;
};

// Function to get weekly attendance, optionally filtered by department
const getWeeklyAttendance = async (dept?: string | null) => {
  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek();
  let attendanceQuery;
  if (dept) {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfWeek)),
      where('logout', '<=', Timestamp.fromDate(endOfWeek)),
      where('dept', '==', dept),
    );
  } else {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfWeek)),
      where('logout', '<=', Timestamp.fromDate(endOfWeek)),
    );
  }
  const attendanceSnapshot = await getDocs(attendanceQuery);

  const weeklyData: { [date: string]: { present: number; absent: number } } =
    {};

  attendanceSnapshot.forEach((doc) => {
    const data = doc.data();
    const date = data.login.toDate().toISOString().split('T')[0];
    if (!weeklyData[date]) {
      weeklyData[date] = { present: 0, absent: 0 };
    }
    weeklyData[date].present += 1;
  });

  const totalUsers = await getTotalUsers(dept);

  Object.keys(weeklyData).forEach((date) => {
    weeklyData[date].absent = totalUsers - weeklyData[date].present;
  });

  return weeklyData;
};

// Function to get combined attendance data, optionally filtered by department
export const getCombinedAttendanceData = async (dept?: string | null) => {
  try {
    const totalUsers = await getTotalUsers(dept);
    const totalPresent = await getTotalPresent(dept);
    const totalAbsent = await getTotalAbsent(totalUsers, dept);
    const lateLogIn = await getLateLogIn(dept);
    const earlyLogOut = await getEarlyLogOut(dept);
    const weeklyAttendance = await getWeeklyAttendance(dept);

    const combinedData = {
      totalUsers,
      totalPresent,
      totalAbsent,
      lateLogIn,
      earlyLogOut,
      weeklyAttendance,
    };

    return combinedData;
  } catch (error) {
    console.error('Error fetching attendance data: ', error);
    throw error;
  }
};

// Monthly Data Functions
const getTotalPresentForMonth = async (
  dept?: string | null,
): Promise<number> => {
  const startOfMonth = getStartOfMonth();
  const endOfMonth = getEndOfMonth();
  let attendanceQuery;
  if (dept) {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfMonth)),
      where('logout', '<=', Timestamp.fromDate(endOfMonth)),
      where('dept', '==', dept),
    );
  } else {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfMonth)),
      where('logout', '<=', Timestamp.fromDate(endOfMonth)),
    );
  }
  const attendanceSnapshot = await getDocs(attendanceQuery);

  const presentEmployees = new Set<string>();

  attendanceSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.empId) {
      presentEmployees.add(data.empId);
    }
  });

  return presentEmployees.size;
};

const getTotalAbsentForMonth = async (
  totalUsers: number,
  dept?: string | null,
) => {
  const totalPresent = await getTotalPresentForMonth(dept);
  return totalUsers - totalPresent;
};

const getLateLogInForMonth = async (dept?: string | null) => {
  const startOfMonth = getStartOfMonth();
  const endOfMonth = getEndOfMonth();
  const lateLogInTime = new Date();
  lateLogInTime.setHours(9, 5, 0, 0); // 9:05 AM
  let attendanceQuery;
  if (dept) {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfMonth)),
      where('login', '<=', Timestamp.fromDate(endOfMonth)),
      where('login', '>', Timestamp.fromDate(lateLogInTime)),
      where('dept', '==', dept),
    );
  } else {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfMonth)),
      where('login', '<=', Timestamp.fromDate(endOfMonth)),
      where('login', '>', Timestamp.fromDate(lateLogInTime)),
    );
  }
  const attendanceSnapshot = await getDocs(attendanceQuery);

  const lateLogins = new Set<string>();

  attendanceSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.empId) {
      lateLogins.add(data.empId);
    }
  });

  return lateLogins.size;
};

const getEarlyLogOutForMonth = async (dept?: string | null) => {
  const startOfMonth = getStartOfMonth();
  const endOfMonth = getEndOfMonth();
  const earlyLogOutTime = new Date();
  earlyLogOutTime.setHours(17, 0, 0, 0); // 5:00 PM
  let attendanceQuery;
  if (dept) {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfMonth)),
      where('logout', '<=', Timestamp.fromDate(endOfMonth)),
      where('logout', '<', Timestamp.fromDate(earlyLogOutTime)),
      where('dept', '==', dept),
    );
  } else {
    attendanceQuery = query(
      collection(db, 'attendance_details'),
      where('login', '>=', Timestamp.fromDate(startOfMonth)),
      where('logout', '<=', Timestamp.fromDate(endOfMonth)),
      where('logout', '<', Timestamp.fromDate(earlyLogOutTime)),
    );
  }
  const attendanceSnapshot = await getDocs(attendanceQuery);

  const earlyLogouts = new Set<string>();

  attendanceSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.empId) {
      earlyLogouts.add(data.empId);
    }
  });

  return earlyLogouts.size;
};

// Function to get monthly attendance data, optionally filtered by department
export const getMonthlyAttendanceData = async (dept?: string | null) => {
  try {
    const totalUsers = await getTotalUsers(dept);
    const totalPresent = await getTotalPresentForMonth(dept);
    const totalAbsent = await getTotalAbsentForMonth(totalUsers, dept);
    const lateLogIn = await getLateLogInForMonth(dept);
    const earlyLogOut = await getEarlyLogOutForMonth(dept);

    const combinedData = {
      totalPresent,
      totalAbsent,
      lateLogIn,
      earlyLogOut,
    };

    return combinedData;
  } catch (error) {
    console.error('Error fetching attendance data: ', error);
    throw error;
  }
};

// Add multiple dummy attendance documents
const createISTTimestamp = (year: number, month: number, day: number, hour: number, minute: number): Timestamp => {
  const date = new Date(year, month, day, hour, minute);
  return Timestamp.fromDate(date);
};

export const addDummyAttendanceDocuments = async (): Promise<void> => {
  const year = 2024;
  const month = 6; // July (months are 0-based in JavaScript Date)
  const day = 21;

  const loginTime = createISTTimestamp(year, month, day, 9, 0); // 9:00 AM IST
  const logoutTime = createISTTimestamp(year, month, day, 17, 0); // 5:00 PM IST

  const dummyAttendanceData: AttendanceDocument[] = [
    {
      empId: 1,
      empName: 'John Doe',
      dept: 'CSE',
      login: loginTime,
      logout: logoutTime,
      loc: new GeoPoint(37.7749, -122.4194),
    },
    {
      empId: 2,
      empName: 'Jane Smith',
      dept: 'CSE',
      login: loginTime,
      logout: logoutTime,
      loc: new GeoPoint(37.7749, -122.4194),
    },
    {
      empId: 3,
      empName: 'Alice Johnson',
      dept: 'ECE',
      login: loginTime,
      logout: logoutTime,
      loc: new GeoPoint(37.7749, -122.4194),
    },
    {
      empId: 4,
      empName: 'Alucard',
      dept: 'ISE',
      login: loginTime,
      logout: logoutTime,
      loc: new GeoPoint(37.7749, -122.4194),
    },
    // Add more dummy data as needed
  ];

  try {
    const promises = dummyAttendanceData.map((doc) =>
      upsertAttendanceDocument(doc),
    );
    await Promise.all(promises);
    console.log('Dummy attendance documents successfully written!');
  } catch (error) {
    console.error('Error writing dummy attendance documents: ', error);
  }
};


// Add multiple dummy user documents
// export const addDummyUserDocuments = async (): Promise<void> => {
//   const dummyUserData: UserDocument[] = [
//     {
//       empId: 1,
//       empName: 'John Doe',
//       dept: 'CSE',
//       position: 'Staff',
//     },
//     {
//       empId: 2,
//       empName: 'Jane Smith',
//       dept: 'CSE',
//       position: 'Staff',
//     },
//     {
//       empId: 3,
//       empName: 'Alice Johnson',
//       dept: 'ECE',
//       position: 'HOD',
//     },
//     {
//       empId: 4,
//       empName: 'Alucard',
//       dept: 'ISE',
//       position: 'Admin',
//     },
//     // Add more dummy data as needed
//   ];

//   try {
//     const promises = dummyUserData.map((doc) => upsertUserDocument(doc));
//     await Promise.all(promises);
//     console.log('Dummy user documents successfully written!');
//   } catch (error) {
//     console.error('Error writing dummy user documents: ', error);
//   }
// };
