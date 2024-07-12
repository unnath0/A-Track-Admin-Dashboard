import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import {
  getAttendanceByDate,
  getAttendanceByDateAndDept,
  getAttendanceByEmpId,
} from '../../database/fs_operations';
import { useEffect, useState } from 'react';
import { AttendanceDocument } from '../../types/product';

const TableTwo = () => {
  const [productData, setProductData] = useState<AttendanceDocument[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let currentDate = `${year}-${month}-${day}`;
      try {
        const result = await getAttendanceByDate(currentDate);
        setProductData(result);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchProductData();
  }, []);

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
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Login Time</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Logout Time</p>
        </div>
        {/* <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Present/Absent</p>
        </div> */}
      </div>

      {productData.map((data) => (
        <div
          className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={data.empId}
        >
          <div className="col-span-1 flex items-center">
            <p className="font-medium">{data.empId}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">{data.empName}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">{data.dept}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">{data.login.toDate().toLocaleTimeString()}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">{data.logout ? data.logout.toDate().toLocaleTimeString() : 'N/A'}</p>
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
