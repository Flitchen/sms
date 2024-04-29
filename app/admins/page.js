"use client";
import AdminTable from "@/components/AdminTable";
import Loading from "@/components/Loading";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Admins() {
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const getAdmins = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/admins`, {
      cache: "no-store",
    });
    const adminData = await response.json();
    setAdmins(adminData);
    setLoading(false);
  };
  useEffect(() => {
    getAdmins();
  }, []);
  return (
    <div className="flex flex-col space-y-4 items-center bg-[#F4F4F4] w-full h-[83vh] overflow-y-auto ">
      <div className="p-3 flex flex-row space-x-4 items-center bg-[#DFDFDF] w-full shadow">
        <Link href={"/admins"}>
          <div className="bg-white p-3">
            <p>All Admins</p>
          </div>
        </Link>
        <Link href={"/admins/add-admin"}>
          <div className=" p-3">
            <p>Add Admin</p>
          </div>
        </Link>
      </div>
      {loading ? <Loading /> : <AdminTable admins={admins} />}
    </div>
  );
}
