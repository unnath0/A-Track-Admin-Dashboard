import {
  getAttendanceByEmpId,
  getEmployees,
} from '../../database/fs_operations';
import { useEffect, useState } from 'react';
import { AttendanceDocument } from '../../types/product';
import { useAttendanceContext } from '../../contexts/AttendanceContext';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';

const TableOne = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceDocument[]>(
    [],
  );
  const { selectedEmpId, setSelectedEmpId, setSelectedDept, selectedTable } =
    useAttendanceContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedEmpId) {
          const result = await getAttendanceByEmpId(selectedEmpId);
          setAttendanceData(result);
        } else if (selectedTable === 'TableOne') {
          const result = await getEmployees();
          setAttendanceData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(attendanceData);
  }, [selectedEmpId, selectedTable]);

  const handleRowClick = (empId: number) => {
    setSelectedEmpId(empId);
    setSelectedDept(null);
  };

  return (
    <div>
      {selectedEmpId ? (
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
                <p className="font-medium">
                  {attendance.login?.toDate().toLocaleTimeString()}
                </p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="font-medium">
                  {attendance.logout
                    ? attendance.logout.toDate().toLocaleTimeString()
                    : 'N/A'}
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">
                  {attendance.login?.toDate().toLocaleDateString('en-GB')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Employees Table
            </h4>
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
          </div>

          {attendanceData.map((employee, key) => (
            <div
              className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={key}
              onClick={() => handleRowClick(employee.empId)}
            >
              <div className="col-span-1 flex items-center">
                <p className="font-medium">{employee.empId}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">{employee.empName}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="font-medium">{employee.dept}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableOne;
