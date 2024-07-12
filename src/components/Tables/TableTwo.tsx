// import { Product } from '../../types/product';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import {
  addDocument,
  addDummyDocuments,
  getAttendanceByDate,
  getAttendanceByDateAndDept,
  getAttendanceByEmpId,
} from '../../database/fs_operations';
import { AttendanceDocument } from '../../types/product';

async function getProductData() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  try {
    const result = await getAttendanceByDate(currentDate);
    return result;
  } catch (error) {
    console.error('Error fetching attendance:', error);
  }
}

const productData = getProductData();

const TableTwo = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Log In Table
        </h4>
        <DatePickerOne />
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Employee ID</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Employee Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Dept</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Log In</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Log Out</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Present/Absent</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">{product.id}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{product.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.dept}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.login}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.logout}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.p_a}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
