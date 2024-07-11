import { Product } from '../../types/product';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';


const productData: Product[] = [
  {
    id: '0001',
    name: 'Teacher 1',
    login: '08:50',
    logout: '04:35',
    p_a: 'P',
  },
  {
    id: '0002',
    name: 'Teacher 2',
    login: '-',
    logout: '-',
    p_a: 'A',
  },
  {
    id: '0003',
    name: 'Teacher 3',
    login: '08:50',
    logout: '04:35',
    p_a: 'P',
  },
  {
    id: '0004',
    name: 'Teacher 4',
    login: '-',
    logout: '-',
    p_a: 'A',
  },
  {
    id: '0005',
    name: 'Teacher 5',
    login: '09:05',
    logout: '03:35',
    p_a: 'P',
  },
  {
    id: '0006',
    name: 'Teacher 6',
    login: '09:05',
    logout: '03:35',
    p_a: 'P',
  },
  {
    id: '0007',
    name: 'Teacher 7',
    login: '08:45',
    logout: '04:30',
    p_a: 'P',
  },
  {
    id: '0008',
    name: 'Teacher 8',
    login: '-',
    logout: '-',
    p_a: 'A',
  },
  {
    id: '0009',
    name: 'Teacher 9',
    login: '08:55',
    logout: '04:40',
    p_a: 'P',
  },
  {
    id: '0010',
    name: 'Teacher 10',
    login: '09:10',
    logout: '03:40',
    p_a: 'P',
  },

  {
    id: '0011',
    name: 'Teacher 11',
    login: '08:50',
    logout: '04:20',
    p_a: 'P',
  },
  {
    id: '0012',
    name: 'Teacher 12',
    login: '-',
    logout: '-',
    p_a: 'A',
  },
  {
    id: '0013',
    name: 'Teacher 13',
    login: '09:00',
    logout: '04:10',
    p_a: 'P',
  },
  {
    id: '0014',
    name: 'Teacher 14',
    login: '09:15',
    logout: '03:50',
    p_a: 'P',
  },
  {
    id: '0015',
    name: 'Teacher 15',
    login: '-',
    logout: '-',
    p_a: 'A',
  },
  {
    id: '0016',
    name: 'Teacher 16',
    login: '08:40',
    logout: '04:25',
    p_a: 'P',
  },
  {
    id: '0017',
    name: 'Teacher 17',
    login: '08:55',
    logout: '04:35',
    p_a: 'P',
  },
  {
    id: '0018',
    name: 'Teacher 18',
    login: '09:05',
    logout: '03:45',
    p_a: 'P',
  },
  {
    id: '0019',
    name: 'Teacher 19',
    login: '-',
    logout: '-',
    p_a: 'A',
  },
  {
    id: '0020',
    name: 'Teacher 20',
    login: '09:10',
    logout: '04:00',
    p_a: 'P',
  },
];

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