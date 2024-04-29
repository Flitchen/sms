import AdminForm from "@/components/AdminForm";
import Link from "next/link";
import React from "react";

export default function AddAdmin() {
  return (
    <div className="flex flex-col space-y-4 items-center bg-[#F4F4F4] w-full h-[83vh] overflow-y-auto">
      <div className="p-3 flex flex-row space-x-4 items-center bg-[#DFDFDF] w-full shadow">
        <Link href={"/admins"}>
          <div className="p-3">
            <p>All Admins</p>
          </div>
        </Link>
        <Link href={"/admins/add-admin"}>
          <div className="bg-white p-3">
            <p>Add Admin</p>
          </div>
        </Link>
      </div>
      <AdminForm />
    </div>
  );
}
