"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

export default function Navbar({ session }) {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const handleMobileNav = () => setOpenMobileNav((prev) => !prev);
  return (
    <nav className="bg-gray-800 text-white p-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <span className="capitalize self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Welcome,{" "}
          <span className="text-orange-400">
            {session.fname} {session.lname}
          </span>
        </span>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div
            className={`absolute top-10 right-10 z-50  my-4 text-base list-none bg-white divide-y py-6 px-8 divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
              openMobileNav ? "" : "hidden"
            }`}
            id="user-dropdown"
          >
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  href="/"
                  onClick={() => setOpenMobileNav((prev) => !prev)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admins"
                  onClick={() => setOpenMobileNav((prev) => !prev)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Admins
                </Link>
              </li>
              <li>
                <Link
                  href="/students"
                  onClick={() => setOpenMobileNav((prev) => !prev)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Students
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  onClick={() => setOpenMobileNav((prev) => !prev)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Results
                </Link>
              </li>
              <li className="cursor-pointer">
                <div
                  onClick={() => signOut()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </div>
              </li>
            </ul>
          </div>

          <div
            className="flex flex-row md:hidden items-center space-x-2  bg-[#F7F7F7] p-2 rounded md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={handleMobileNav}
          >
            {openMobileNav ? (
              <GrClose color="gray" size={25} />
            ) : (
              <GiHamburgerMenu color="gray" size={25} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
