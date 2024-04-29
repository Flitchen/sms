"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Results() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/courses`, {
      cache: "no-store",
    });
    const courseData = await response.json();
    setCourses(courseData);
    setLoading(false);
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex flex-col space-y-4 items-center bg-[#F4F4F4] w-full h-[83vh] overflow-y-auto">
      <div className="p-3 flex flex-row space-x-4 items-center bg-[#DFDFDF] w-full shadow ">
        <div className="bg-white p-3">
          <p>Select Course</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : courses.length > 0 ? (
        courses.map((course) => {
          return (
            <Link
              href={{
                pathname: `/results/${course.c_id}`,
                query: {
                  course: course.name,
                },
              }}
              // as={`/results/${course.name.replace(/ /g, "-")}`}
              className="list-none block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700  focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white capitalize"
            >
              <li>{course.name}</li>
            </Link>
          );
        })
      ) : (
        <p className="capitalize text-xl font-semibold">No data available</p>
      )}
    </div>
  );
}
