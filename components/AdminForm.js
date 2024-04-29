"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminForm() {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (fname.trim || !lname || !phone) {
    //   toast.error("Please fill all the required fields");
    //   return;
    // }
    toast.loading("Adding admin");

    const response = await fetch("http://localhost:3000/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // Checking if the response was okay.

    if (response.ok) {
      toast.success("User was added successfully");
      setFormData({
        fname: "",
        mname: "",
        lname: "",
        phone: "",
      });
    } else {
      toast.error("Failed to add admin");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 pb-8 rounded shadow max-w-md"
    >
      <h3 className="text-xl font-bold mb-4 text-center">Add Admin</h3>
      <div className="grid grid-cols-2 gap-5">
        <div className="mb-4">
          <label htmlFor="fname" className="block text-gray-700 font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            value={formData.fname}
            onChange={(e) =>
              setFormData({ ...formData, fname: e.target.value })
            }
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mname" className="block text-gray-700 font-bold mb-2">
            Middle Name
          </label>
          <input
            type="text"
            id="mname"
            value={formData.mname}
            onChange={(e) =>
              setFormData({ ...formData, mname: e.target.value })
            }
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lname" className="block text-gray-700 font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            value={formData.lname}
            onChange={(e) =>
              setFormData({ ...formData, lname: e.target.value })
            }
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="+2551234567"
            autoComplete="off"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
            required
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleSubmit}
          type="submit"
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Admin
        </button>
      </div>
    </form>
  );
}
