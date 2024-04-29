"use client";
import { dummyAdmins } from "@/constants";
import { useEffect, useState, useMemo } from "react";
import { FaAngleLeft, FaAngleRight, FaPen, FaTrashCan } from "react-icons/fa6";
import Link from "next/link";

const TableList = ({ admins }) => {
  const [adminList, setAdminList] = useState(admins);
  const [rowsLimit, setRowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(adminList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(adminList?.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = adminList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = adminList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = adminList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(adminList?.length / rowsLimit)).fill(null)
    );
  }, []);

  // console.log(adminList);
  return (
    <div className="flex  items-center justify-center">
      {admins.length <= 0 ? (
        <p className="capitalize text-xl font-semibold">No data available</p>
      ) : (
        <div className="w-full max-w-4xl px-2">
          <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left border ">
              <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="bg-[#222E3A]/[6%]">
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    First Name
                  </th>
                  <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Middle Name
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Last Name
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsToShow?.map((data, index) => (
                  <tr
                    className={`${
                      index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                    }`}
                    key={index}
                  >
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.id}
                    </td>
                    <td
                      className={`capitalize py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.fname}
                    </td>
                    <td
                      className={`capitalize py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.mname == "" ? "-" : data?.mname}
                    </td>
                    <td
                      className={`capitalize py-2 px-3 text-base  font-normal ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.lname}
                    </td>

                    <td
                      className={`py-5 px-4 text-base  font-normal ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      }`}
                    >
                      {data?.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
            <div className="text-lg">
              Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
              {currentPage == totalPage - 1
                ? adminList?.length
                : (currentPage + 1) * rowsLimit}{" "}
              of {adminList?.length} entries
            </div>
            <div className="flex">
              <ul
                className="flex justify-center items-center gap-x-[10px] z-30"
                role="navigation"
                aria-label="Pagination"
              >
                <li
                  className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                    currentPage == 0
                      ? "bg-[#cccccc] pointer-events-none"
                      : " cursor-pointer"
                  }
  `}
                  onClick={previousPage}
                >
                  <FaAngleLeft />{" "}
                </li>
                {customPagination?.map((data, index) => (
                  <li
                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid bg-[#FFFFFF] cursor-pointer ${
                      currentPage == index
                        ? "text-blue-600  border-sky-500"
                        : "border-[#E4E4EB] "
                    }`}
                    onClick={() => changePage(index)}
                    key={index}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                    currentPage == totalPage - 1
                      ? "bg-[#cccccc] pointer-events-none"
                      : " cursor-pointer"
                  }`}
                  onClick={nextPage}
                >
                  <FaAngleRight />{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TableList;
