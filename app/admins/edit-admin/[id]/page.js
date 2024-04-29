import StudentForm from "@/components/StudentForm";
import Link from "next/link";
import React from "react";

export default function EditAdmin() {
  return (
    <div className="flex flex-col space-y-4 items-center bg-[#F4F4F4] w-full h-[83vh] overflow-y-auto">
      <div className="p-3 flex flex-row space-x-4 items-center bg-[#DFDFDF] w-full shadow">
        <Link href={"/students"}>
          <div className="p-3">
            <p>All Students</p>
          </div>
        </Link>
        <Link href={"/students/add-student"}>
          <div className="p-3">
            <p>Add Student</p>
          </div>
        </Link>
        <div className="bg-white p-3">
          <p>Edit Student</p>
        </div>
      </div>
      <StudentForm />
    </div>
  );
}
