"use client";
import { dummyAdmins } from "@/constants";
import { useState, useMemo } from "react";
import { FaAngleLeft, FaAngleRight, FaPen, FaTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineCheck } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TableList = ({ students, results, programmes }) => {
  const mergedData = results.map((result) => {
    const student = students.find((student) => student.s_id === result.s_id);
    const programme = programmes.find(
      (programme) => programme.p_id === student.p_id
    );
    return { ...result, ...student, programmeName: programme.name };
  });

  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [editedMarks, setEditedMarks] = useState({});
  const [studentList, setStudentList] = useState(mergedData);
  const [rowsLimit, setRowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(studentList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(studentList?.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [programme, setProgramme] = useState("");
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = studentList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = studentList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = studentList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  const handleEditClick = (index) => {
    setEditableRowIndex(index);
  };
  const handleCancelClick = () => {
    setEditableRowIndex(null);
    setEditedMarks({});
  };
  const handleSaveClick = async (e) => {
    e.preventDefault();
    toast.loading("Updating marks");

    const response = await fetch(
      `http://localhost:3000/api/results/${combinedData[0].c_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedMarks),
      }
    );

    // Checking if the response was okay.
    if (response.ok) {
      toast.success("Marks updated successfully");
      location.reload();
    } else {
      toast.error("Failed to update marks");
    }

    setEditedMarks({});
    setEditableRowIndex(null);
  };

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(studentList?.length / rowsLimit)).fill(null)
    );
  }, []);
  // console.log(mergedData[0]);
  return (
    <div className="flex  items-center justify-center space-x-5">
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
                  Gender
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Year of Study
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Programme
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Grade
                </th>

                <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {gender != ""
                ? rowsToShow
                    .filter((data) => data.gender.toLowerCase() === gender)
                    .map((data, index) => (
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
                          {data?.s_id}
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
                          className={`capitalize py-2 px-3 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          } whitespace-nowrap`}
                        >
                          {data?.gender}
                        </td>
                        <td
                          className={`capitalize py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {new Date().getFullYear() - data?.year_started}
                        </td>
                        <td
                          className={`uppercase py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {data?.programmeName}
                        </td>
                        <td
                          className={`capitalize py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {editableRowIndex === index ? (
                            <input
                              type="text"
                              maxLength={1}
                              autoFocus
                              onChange={(e) => {
                                setEditedMarks({
                                  s_id: data.s_id,
                                  c_id: data.c_id,
                                  e_id: data.e_id,
                                  marks: e.target.value,
                                });
                              }}
                              className="capitalize text-center w-10 h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          ) : (
                            data?.marks
                          )}
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
                          <div className="flex justify-around">
                            {editableRowIndex === index ? (
                              <>
                                <div
                                  className="hover:bg-gray-300 p-2 rounded"
                                  onClick={handleSaveClick}
                                >
                                  <MdOutlineCheck
                                    className="text-green-500 "
                                    size={"25px"}
                                  />
                                </div>
                                <div
                                  className="hover:bg-gray-300 p-2 rounded"
                                  onClick={handleCancelClick}
                                >
                                  <RxCross1
                                    className="text-gray-500 "
                                    size={"23px"}
                                  />
                                </div>
                              </>
                            ) : (
                              <div
                                className="hover:bg-gray-300 p-2 rounded"
                                onClick={() => handleEditClick(index)}
                              >
                                <FaPen className="text-sky-500 " />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                : grade != ""
                ? rowsToShow
                    .filter((data) => data.marks.toLowerCase() === grade)
                    .map((data, index) => (
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
                          {data?.s_id}
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
                          className={`capitalize py-2 px-3 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          } whitespace-nowrap`}
                        >
                          {data?.gender}
                        </td>
                        <td
                          className={`capitalize py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {new Date().getFullYear() - data?.year_started}
                        </td>
                        <td
                          className={`uppercase py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {data?.programmeName}
                        </td>
                        <td
                          className={`capitalize py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {editableRowIndex === index ? (
                            <input
                              type="text"
                              maxLength={1}
                              autoFocus
                              onChange={(e) => {
                                setEditedMarks({
                                  s_id: data.s_id,
                                  c_id: data.c_id,
                                  e_id: data.e_id,
                                  marks: e.target.value,
                                });
                              }}
                              className="capitalize text-center w-10 h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          ) : (
                            data?.marks
                          )}
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
                          <div className="flex justify-around">
                            {editableRowIndex === index ? (
                              <>
                                <div
                                  className="hover:bg-gray-300 p-2 rounded"
                                  onClick={handleSaveClick}
                                >
                                  <MdOutlineCheck
                                    className="text-green-500 "
                                    size={"25px"}
                                  />
                                </div>
                                <div
                                  className="hover:bg-gray-300 p-2 rounded"
                                  onClick={handleCancelClick}
                                >
                                  <RxCross1
                                    className="text-gray-500 "
                                    size={"23px"}
                                  />
                                </div>
                              </>
                            ) : (
                              <div
                                className="hover:bg-gray-300 p-2 rounded"
                                onClick={() => handleEditClick(index)}
                              >
                                <FaPen className="text-sky-500 " />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                : programme != ""
                ? rowsToShow
                    .filter(
                      (data) => data.programmeName.toLowerCase() === programme
                    )
                    .map((data, index) => (
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
                          {data?.s_id}
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
                          className={`capitalize py-2 px-3 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          } whitespace-nowrap`}
                        >
                          {data?.gender}
                        </td>
                        <td
                          className={`capitalize py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {new Date().getFullYear() - data?.year_started}
                        </td>
                        <td
                          className={`uppercase py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {data?.programmeName}
                        </td>
                        <td
                          className={`capitalize py-5 px-4 text-base  font-normal ${
                            index == 0
                              ? "border-t-2 border-black"
                              : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                          }`}
                        >
                          {editableRowIndex === index ? (
                            <input
                              type="text"
                              maxLength={1}
                              autoFocus
                              onChange={(e) => {
                                setEditedMarks({
                                  s_id: data.s_id,
                                  c_id: data.c_id,
                                  e_id: data.e_id,
                                  marks: e.target.value,
                                });
                              }}
                              className="capitalize text-center w-10 h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          ) : (
                            data?.marks
                          )}
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
                          <div className="flex justify-around">
                            {editableRowIndex === index ? (
                              <>
                                <div
                                  className="hover:bg-gray-300 p-2 rounded"
                                  onClick={handleSaveClick}
                                >
                                  <MdOutlineCheck
                                    className="text-green-500 "
                                    size={"25px"}
                                  />
                                </div>
                                <div
                                  className="hover:bg-gray-300 p-2 rounded"
                                  onClick={handleCancelClick}
                                >
                                  <RxCross1
                                    className="text-gray-500 "
                                    size={"23px"}
                                  />
                                </div>
                              </>
                            ) : (
                              <div
                                className="hover:bg-gray-300 p-2 rounded"
                                onClick={() => handleEditClick(index)}
                              >
                                <FaPen className="text-sky-500 " />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                : rowsToShow?.map((data, index) => (
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
                        {data?.s_id}
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
                        className={`capitalize py-2 px-3 text-base  font-normal ${
                          index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-nowrap`}
                      >
                        {data?.gender}
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
                        {new Date().getFullYear() - data?.year_started}
                      </td>
                      <td
                        className={`uppercase py-5 px-4 text-base  font-normal ${
                          index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        }`}
                      >
                        {data?.programmeName}
                      </td>
                      <td
                        className={`capitalize py-5 px-4 text-base  font-normal ${
                          index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        }`}
                      >
                        {editableRowIndex === index ? (
                          <input
                            type="text"
                            maxLength={1}
                            autoFocus
                            onChange={(e) => {
                              setEditedMarks({
                                s_id: data.s_id,
                                c_id: data.c_id,
                                e_id: data.e_id,
                                marks: e.target.value,
                              });
                            }}
                            className="capitalize text-center w-10 h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        ) : (
                          data?.marks
                        )}
                      </td>
                      <td
                        className={`capitalize py-5 px-4 text-base  font-normal ${
                          index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        }`}
                      >
                        <div className="flex justify-around">
                          {editableRowIndex === index ? (
                            <>
                              <div
                                className="hover:bg-gray-300 p-2 rounded"
                                onClick={handleSaveClick}
                              >
                                <MdOutlineCheck
                                  className="text-green-500 "
                                  size={"25px"}
                                />
                              </div>
                              <div
                                className="hover:bg-gray-300 p-2 rounded"
                                onClick={handleCancelClick}
                              >
                                <RxCross1
                                  className="text-gray-500 "
                                  size={"23px"}
                                />
                              </div>
                            </>
                          ) : (
                            <div
                              className="hover:bg-gray-300 p-2 rounded"
                              onClick={() => handleEditClick(index)}
                            >
                              <FaPen className="text-sky-500 " />
                            </div>
                          )}
                        </div>
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
              ? studentList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {studentList?.length} entries
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
      <div className="flex flex-col px-10 py-6 bg-[#DFDFDF] w-full">
        <p className="capitalize text-lg font-semibold">Filter results</p>
        <p className="capitalize">By gender</p>
        <>
          <div className="flex flex-col">
            <div>
              <input
                type="radio"
                id="allGender"
                name="gender"
                value=""
                checked={gender === ""}
                onChange={() => setGender("")}
              />
               <label htmlFor="allGender">All</label>
            </div>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
               <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
               <label htmlFor="female">Female</label>
            </div>
             
          </div>
        </>
        <p className="capitalize">By Grade</p>
        <>
          <div className="flex flex-row space-x-3 mb-4">
            <div className="flex flex-col items-center space-y-1">
               <label htmlFor="allGrade">All</label>
              <input
                type="radio"
                id="allGrade"
                name="grade"
                value=""
                checked={grade === ""}
                onChange={() => setGrade("")}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
               <label htmlFor="a">A</label>
              <input
                type="radio"
                id="a"
                name="grade"
                value="a"
                checked={grade === "a"}
                onChange={() => setGrade("a")}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
               <label htmlFor="b">B</label>
              <input
                type="radio"
                id="b"
                name="grade"
                value="b"
                checked={grade === "b"}
                onChange={() => setGrade("b")}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
               <label htmlFor="c">C</label>
              <input
                type="radio"
                id="c"
                name="grade"
                value="c"
                checked={grade === "c"}
                onChange={() => setGrade("c")}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
               <label htmlFor="d">D</label>
              <input
                type="radio"
                id="d"
                name="grade"
                value="d"
                checked={grade === "d"}
                onChange={() => setGrade("d")}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
               <label htmlFor="e">E</label>
              <input
                type="radio"
                id="e"
                name="grade"
                value="e"
                checked={grade === "e"}
                onChange={() => setGrade("e")}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
               <label htmlFor="f">F</label>
              <input
                type="radio"
                id="f"
                name="grade"
                value="f"
                checked={grade === "f"}
                onChange={() => setGrade("f")}
              />
            </div>
             
          </div>
        </>
        <p className="capitalize">By Programme</p>
        <>
          <div className="flex flex-col">
            <div>
              <input
                type="radio"
                id="allProgramme"
                name="programme"
                value=""
                checked={programme === ""}
                onChange={() => setProgramme("")}
              />
              <label htmlFor="allProgramme">All</label>
            </div>
            {programmes.map((prog) => {
              return (
                <div>
                  <input
                    type="radio"
                    id={prog.name}
                    name="programme"
                    value={prog.name}
                    checked={programme === prog.name}
                    onChange={() => setProgramme(prog.name)}
                  />
                   
                  <label htmlFor={prog.name} className="uppercase">
                    {prog.name}
                  </label>
                </div>
              );
            })}
          </div>
        </>
      </div>
    </div>
  );
};
export default TableList;
