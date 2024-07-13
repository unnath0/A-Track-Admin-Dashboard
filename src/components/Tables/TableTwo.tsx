import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import {
  getAttendanceByDate,
  getAttendanceByDateAndDept,
  getAttendanceByEmpId,
} from '../../database/fs_operations';
import { useEffect, useState } from 'react';
import { AttendanceDocument } from '../../types/product';
import { useAttendanceContext } from '../../contexts/AttendanceContext';

const TableTwo = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceDocument[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const { selectedDept, selectedEmpId, setSelectedEmpId } = useAttendanceContext();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        if (selectedEmpId !== null) {
          const result = await getAttendanceByEmpId(selectedEmpId);
          setAttendanceData(result);
        } else if (selectedDept !== null) {
          const result = await getAttendanceByDateAndDept(currentDate, selectedDept);
          setAttendanceData(result);
        } else {
          const result = await getAttendanceByDate(currentDate);
          setAttendanceData(result);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendanceData();
  }, [currentDate, selectedDept, selectedEmpId]);

  const handleRowClick = (empId: number) => {
    setSelectedEmpId(empId);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Log In Table
        </h4>
        <DatePickerOne />
      </div>

      <div className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Employee ID</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Employee Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Dept</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Login Time</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Logout Time</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Date</p>
        </div>
        {/* <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Present/Absent</p>
        </div> */}
      </div>

      {attendanceData.map((attendance, key) => (
        <div
          className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
          onClick={() => handleRowClick(attendance.empId)}
        >
          <div className="col-span-1 flex items-center">
            <p className="font-medium">{attendance.empId}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">{attendance.empName}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">{attendance.dept}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">{attendance.login.toDate().toLocaleTimeString()}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">{attendance.logout ? attendance.logout.toDate().toLocaleTimeString() : 'N/A'}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">{attendance.login.toDate().toLocaleDateString('en-GB')}</p>
          </div>
          {/* <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">{data.p_a}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
