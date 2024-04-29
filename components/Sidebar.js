"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col min-w-60 bg-[#F7F7F7] min-h-screen border-r border-r-gray-200 ">
      <div className="bg-gray-800 ">
        <h3 className="uppercase text-xl text-white text-center font-bold">
          Student Management System
        </h3>
      </div>
      <ul className="p-6">
        <li className="mb-2">
          <Link href="/">
            <p className="hover:underline">Dashboard</p>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admins">
            <p className="hover:underline">Admins</p>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/students">
            <p className="hover:underline">Students</p>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/results">
            <p className="hover:underline">Results</p>
          </Link>
        </li>
        <li className="mb-2 cursor-pointer" onClick={() => signOut()}>
          <p className="hover:underline">Sign Out</p>
        </li>
      </ul>
    </div>
  );
}
