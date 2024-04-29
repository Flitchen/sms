"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminForm() {
  const [programmes, setProgrammes] = useState([]);
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    gender: "",
    yearStarted: "",
    programme: "",
  });

  const getProgrammes = async () => {
    const response = await fetch(`http://localhost:3000/api/programmes`, {
      cache: "no-store",
    });
    const programmeData = await response.json();
    setProgrammes(programmeData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // if (fname.trim || !lname || !phone) {
    //   toast.error("Please fill all the required fields");
    //   return;
    // }

    if (isNaN(parseInt(formData.yearStarted))) {
      toast.error("The year is not a number");
      return;
    }
    toast.loading("Adding student");

    const response = await fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Checking if the response was okay.
    if (response.ok) {
      toast.success("Student was added successfully");
      setFormData({
        fname: "",
        mname: "",
        lname: "",
        phone: "",
        gender: "",
        yearStarted: "",
        programme: "",
      });
    } else {
      toast.error("Failed to add student");
    }
  };

  useEffect(() => {
    getProgrammes();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 pb-8 rounded shadow max-w-md"
    >
      <h3 className="text-xl font-bold mb-4 text-center">Add Student</h3>
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-opacity-50"
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-opacity-50"
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-opacity-50"
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
        <div className="space-y-3">
          <p>Select gender</p>
          <div className="flex flex-row items-center space-x-3">
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={() => setFormData({ ...formData, gender: "male" })}
              />
               <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={() => setFormData({ ...formData, gender: "female" })}
              />
               <label htmlFor="female">Female</label>
            </div>
             
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="yearStarted"
            className="block text-sm font-medium text-gray-700"
          >
            Year Started
          </label>
          <input
            type="text"
            id="yearStarted"
            name="yearStarted"
            placeholder="2021"
            autoComplete="off"
            value={formData.yearStarted}
            onChange={(e) => {
              setFormData({ ...formData, yearStarted: e.target.value });
            }}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="programme"
            className="block text-sm font-medium text-gray-700"
          >
            Programme
          </label>
          <input
            type="text"
            id="programme"
            name="programme"
            placeholder="Enter programme"
            value={formData.programme}
            onChange={(e) => {
              setFormData({ ...formData, programme: e.target.value });
            }}
            list="programme-list"
            className="block text-sm py-3 px-4 mt-3 mb-10 rounded-lg w-full border outline-none"
            required
          />
          <datalist id="programme-list">
            {programmes.map((programme) => (
              <option
                key={programme.id}
                value={programme.name}
                className="uppercase"
              />
            ))}
          </datalist>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleSubmit}
          type="submit"
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Student
        </button>
      </div>
    </form>
  );
}
