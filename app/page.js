"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState(0);
  const [admins, setAdmins] = useState(0);

  const getAdmins = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/admins`, {
      cache: "no-store",
    });
    const adminData = await response.json();
    setAdmins(adminData.length);
    setLoading(false);
  };

  const getStudents = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/students`, {
      cache: "no-store",
    });
    const studentData = await response.json();
    setStudents(studentData.length);
    setLoading(false);
  };
  useEffect(() => {
    getStudents();
    getAdmins();
  }, []);
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Student Management System</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admins">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Admins</h2>
              <p className="text-gray-600">{admins}</p>
            </div>
          </Link>
          <Link href={"/students"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Students</h2>
              <p className="text-gray-600">{students}</p>
            </div>
          </Link>
          <Link href={"/results"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Results</h2>
              <p className="text-gray-600">Check Results</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
