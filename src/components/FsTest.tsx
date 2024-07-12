import {
  addDummyAttendanceDocuments,
  addDummyUserDocuments,
  getAttendanceByDate,
  getAttendanceByDateAndDept,
  getAttendanceByEmpId,
} from '../database/fs_operations';

const App: React.FC = () => {
  const runQueries = async () => {
    // Add dummy user documents
    await addDummyUserDocuments();

    // Add dummy attendance documents
    await addDummyAttendanceDocuments();

    // Get attendance by date
    const attendanceByDate = await getAttendanceByDate('2024-07-12');
    console.log('Attendance by date:', attendanceByDate);

    // Get attendance by date and dept
    const attendanceByDateAndDept = await getAttendanceByDateAndDept(
      '2024-07-12',
      'CSE',
    );
    console.log('Attendance by date and dept:', attendanceByDateAndDept);

    // Get attendance by empId
    const attendanceByEmpId = await getAttendanceByEmpId(1);
    console.log('Attendance by empId:', attendanceByEmpId);
  };

  runQueries();

  return <div>Check the console for Firestore queries results</div>;
};

export default App;
