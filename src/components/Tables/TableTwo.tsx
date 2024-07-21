import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import {
  getAttendanceByDate,
  getAttendanceByDateAndDept,
  getAttendanceByEmpId,
  getEmployees,
  getEmployeesByDept,
} from '../../database/fs_operations';
import { useEffect, useState } from 'react';
import { AttendanceDocument, UserDocument } from '../../types/product';
import { useAttendanceContext } from '../../contexts/AttendanceContext';
import useCurrentUserDetails from '../../hooks/currentUserDetails';

const TableTwo = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceDocument[]>(
    [],
  );
  const [employeesData, setEmployeesData] = useState<UserDocument[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const {
    selectedDept,
    setSelectedDept,
    selectedEmpId,
    setSelectedEmpId,
    selectedTable,
    setSelectedTable,
  } = useAttendanceContext();
  const [error, setError] = useState<string | null>(null);

  const currentUserDetail = useCurrentUserDetails();

  useEffect(() => {
    if (currentUserDetail?.position === 'Staff') {
      setSelectedEmpId(currentUserDetail.empId);
      setSelectedDept(null);
      setSelectedTable('TableTwo');
    } else if (currentUserDetail?.position === 'HOD') {
      setSelectedDept(currentUserDetail.dept);
      setSelectedEmpId(null);
      setSelectedTable('TableTwo');
    }
  }, [currentUserDetail, setSelectedEmpId, setSelectedDept, setSelectedTable]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setError(null);
      try {
        console.log('Fetching data with:', {
          currentDate,
          selectedDept,
          selectedEmpId,
          selectedTable,
        });
        if (selectedEmpId) {
          const result = await getAttendanceByEmpId(selectedEmpId);
          setAttendanceData(result);
        } else if (selectedTable === 'TableOne') {
          if (selectedDept == null) {
            const result = await getEmployees();
            setEmployeesData(result);
          } else {
            const result = await getEmployeesByDept(selectedDept);
            setEmployeesData(result);
          }
        } else if (selectedDept) {
          const result = await getAttendanceByDateAndDept(
            currentDate,
            selectedDept,
          );
          setAttendanceData(result);
        } else {
          const result = await getAttendanceByDate(currentDate);
          setAttendanceData(result);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setError('Failed to fetch attendance data.');
      }
    };

    fetchAttendanceData();
  }, [currentDate, selectedDept, selectedEmpId, selectedTable]);

  const handleRowClick = (empId: number, tableName: string) => {
    setSelectedEmpId(empId);
    setSelectedDept(null);
    setSelectedTable(tableName);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {selectedTable === 'TableTwo' ? (
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
              className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 hover:cursor-pointer hover:bg-slate-800"
              key={key}
              onClick={() => handleRowClick(attendance.empId, 'TableTwo')}
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
                  {attendance.login.toDate().toLocaleTimeString()}
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
                  {attendance.login.toDate().toLocaleDateString('en-GB')}
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

          {employeesData.map((employee, key) => (
            <div
              className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 hover:cursor-pointer hover:bg-slate-800"
              key={key}
              onClick={() => handleRowClick(employee.empId, 'TableTwo')}
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

export default TableTwo;
