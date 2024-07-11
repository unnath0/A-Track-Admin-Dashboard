import React from 'react';
import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
import TableTwo from '../../components/Tables/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Present" total="93" rate="4.6%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="25"
            height="18"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <circle cx="10" cy="8" r="5"></circle>{' '}
              <path
                d="M19 10L19 16"
                stroke-width="2"
                stroke-linecap="round"
              ></path>{' '}
              <path
                d="M22 13L16 13"
                stroke-width="2"
                stroke-linecap="round"
              ></path>{' '}
              <path d="M17.1421 20.3825C17.6038 20.278 17.8806 19.7981 17.676 19.3713C17.1242 18.2203 16.2173 17.2088 15.0419 16.4465C13.5955 15.5085 11.8232 15 10 15C8.17681 15 6.40455 15.5085 4.95811 16.4465C3.78266 17.2088 2.87577 18.2202 2.32396 19.3713C2.11935 19.7981 2.39623 20.278 2.85786 20.3825C7.55976 21.4474 12.4402 21.4474 17.1421 20.3825Z"></path>{' '}
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Absent" total="12" rate="4.35%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path d="M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L8.07441 9.13519C7.44331 9.39951 6.99995 10.023 6.99995 10.75V12H8.49995V10.75L8.50655 10.6927C8.53246 10.5823 8.6316 10.5 8.74995 10.5H9.43923L11.9363 12.9971H3.74904C3.04018 12.9971 2.72696 13.8897 3.28036 14.3327L7.99995 18.1104V19.7546C7.99995 20.9973 9.00731 22.0046 10.2499 22.0046H13.7453C14.988 22.0046 15.9953 20.9973 15.9953 19.7546V18.1103L16.5807 17.6416L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968ZM15.5135 16.5745L14.7765 17.1646C14.5988 17.3069 14.4953 17.5223 14.4953 17.75V19.7546C14.4953 20.1688 14.1595 20.5046 13.7453 20.5046H10.2499C9.83574 20.5046 9.49995 20.1688 9.49995 19.7546V17.75C9.49995 17.5223 9.39645 17.3068 9.21863 17.1645L5.88622 14.4971H13.4362L15.5135 16.5745Z"></path>{' '}
              <path d="M11.9999 8.0005C11.656 8.0005 11.3256 7.94263 11.018 7.83609L9.16434 5.98244C9.05781 5.67477 8.99995 5.34439 8.99995 5.0005C8.99995 3.34364 10.3431 2.0005 11.9999 2.0005C13.6568 2.0005 14.9999 3.34364 14.9999 5.0005C14.9999 6.65735 13.6568 8.0005 11.9999 8.0005ZM11.9999 3.5005C11.1715 3.5005 10.4999 4.17207 10.4999 5.0005C10.4999 5.82892 11.1715 6.5005 11.9999 6.5005C12.8284 6.5005 13.4999 5.82892 13.4999 5.0005C13.4999 4.17207 12.8284 3.5005 11.9999 3.5005Z"></path>{' '}
              <path d="M20.2444 12.9971H16.1789L18.9367 15.755L20.7132 14.3326C21.2665 13.8895 20.9532 12.9971 20.2444 12.9971Z"></path>{' '}
              <path d="M13.6818 10.5L12.1819 9.00004H15.2447C16.1628 9.00004 16.9158 9.70715 16.9889 10.6065L16.9947 10.75V12H15.4947V10.75C15.4947 10.6317 15.4124 10.5325 15.302 10.5066L15.2447 10.5H13.6818Z"></path>{' '}
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Late Log In" total="3" rate="">
          <svg
            className="fill-primary dark:fill-white"
            height="22px"
            width="22px"
            version="1.2"
            baseProfile="tiny"
            id="_x31_"
            xmlns="http://www.w3.org/2000/svg"
            // xlink="http://www.w3.org/1999/xlink"
            viewBox="-63 65 128 128"
            // xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path d="M19,73.3c2.5-5.3,8.8-7.6,14.1-5.1c5.3,2.5,7.6,8.8,5.1,14.1c-2.5,5.3-8.8,7.6-14.1,5.1S16.6,78.6,19,73.3z M56.3,112.3 H37.9l-4.8-13c-1.6-4.1-4.8-7.6-9.3-9.2l-1.8-0.9c-4.1-2-8.7-1.8-12.5-0.2l-17.5,6.3c-1.2,0.3-2.2,1.3-2.8,2.5l-9.2,19.7 c-1,2.4-0.1,5.1,2.2,6.2c2.4,1,5.1,0.1,6.2-2.2l8.4-18l10.2-3.7l-24,51.2h-22.1c-3.7,0-6.6,2.9-6.6,6.6s2.9,6.6,6.6,6.6h26.4 c2.6,0,4.8-1.6,6-3.8l8.4-18L18,187.7c1.2,3.5,5.1,5.2,8.4,3.9c3.5-1.2,5.2-5.1,3.9-8.4l-17-46.9L26.5,108l3.9,10.7 c0.7,1.7,2.4,3,4.4,3h21.6c2.5,0,4.6-2.1,4.6-4.6C60.9,114.5,58.7,112.3,56.3,112.3z M-28,99.5c7.8-7.2,8.3-19.5,1.1-27.2 c-7.2-7.8-19.4-8.3-27.2-1.1s-8.3,19.4-1.1,27.2S-35.9,106.7-28,99.5z M-52.2,73.2c6.7-6.2,17-5.6,23.2,1c6.2,6.7,5.6,17-1,23.2 c-6.7,6.2-17,5.6-23.1-0.9C-59.3,89.8-58.8,79.3-52.2,73.2z M-40.1,71.5h-2v13.4h-8.4v2h10.4V71.5z"></path>{' '}
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Users" total="130" rate="0.95%" levelDown>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        <div className="col-span-12 xl:row-span-5 xl:col-span-8">
          <TableTwo />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <ChartThree />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <ChartTwo />
        </div>
        {/* <div className="col-span-12 xl:col-span-4">
          <ChartOne />
        </div> */}
        {/* <div className="col-span-12">
          <ChatCard />
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
