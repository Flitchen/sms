"use client";
import Loading from "@/components/Loading";
import StudentTable from "@/components/StudentTable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Students() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/students`, {
      cache: "no-store",
    });
    const studentData = await response.json();
    setStudents(studentData);
    setLoading(false);
  };
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div className="flex flex-col space-y-4 items-center bg-[#F4F4F4] w-full h-[83vh] overflow-y-auto">
      <div className="p-3 flex flex-row space-x-4 items-center bg-[#DFDFDF] w-full shadow">
        <Link href={"/students"}>
          <div className="bg-white p-3">
            <p>All Students</p>
          </div>
        </Link>
        <Link href={"/students/add-student"}>
          <div className=" p-3">
            <p>Add Student</p>
          </div>
        </Link>
      </div>

      {loading ? <Loading /> : <StudentTable students={students} />}
    </div>
  );
}
