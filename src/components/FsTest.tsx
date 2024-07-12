import React, { useEffect } from 'react';
import { 
  addDocument, 
  addDummyDocuments, 
  getAttendanceByDate, 
  getAttendanceByDateAndDept, 
  getAttendanceByEmpId 
} from '../database/fs_operations';
import { Timestamp, GeoPoint } from 'firebase/firestore';

const App: React.FC = () => {
  useEffect(() => {
    // Example usage
    const runQueries = async () => {
      // Add a document
      // await addDocument("user_details", {
      //   dept: "CSE",
      //   empId: 1,
      //   empName: "John Doe",
      //   position: "Staff",
      // });

      await addDummyDocuments("user_details", [
        {
          dept: "CSE",
          empId: 1,
          empName: "John Doe",
          position: "Staff",
        },
        {
          dept: "CSE",
          empId: 2,
          empName: "Ram",
          position: "Staff",
        },
        {
          dept: "CSE",
          empId: 3,
          empName: "Raj",
          position: "Staff",
        },
        {
          dept: "ISE",
          empId: 4,
          empName: "Sheldon",
          position: "HOD",
        },
        {
          dept: "ECE",
          empId: 5,
          empName: "Shiro",
          position: "Admin",
        },
      ]);

      // Add dummy documents
      await addDummyDocuments("attendance_details", [
        {
          empId: 1,
          empName: "John Doe",
          dept: "CSE",
          login: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 1,
          empName: "John Doe",
          dept: "CSE",
          logout: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 2,
          empName: "Ram",
          dept: "CSE",
          login: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 2,
          empName: "Ram",
          dept: "CSE",
          logout: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 3,
          empName: "Raj",
          dept: "CSE",
          login: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 3,
          empName: "Raj",
          dept: "CSE",
          logout: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 4,
          empName: "Sheldon",
          dept: "ISE",
          login: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 4,
          empName: "Sheldon",
          dept: "ISE",
          logout: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 5,
          empName: "Shiro",
          dept: "ECE",
          login: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
        {
          empId: 5,
          empName: "Shiro",
          dept: "ECE",
          logout: Timestamp.fromDate(new Date()),
          loc: new GeoPoint(37.7749, -122.4194),
        },
      ]);

      // Get attendance by date
      await getAttendanceByDate("2024-07-12");

      // Get attendance by date and dept
      await getAttendanceByDateAndDept("2024-07-12", "CSE");

      // Get attendance by empId
      await getAttendanceByEmpId(12345);
    };

    runQueries();
  });

  return <div>Check the console for Firestore queries results</div>;
};

export default App;
