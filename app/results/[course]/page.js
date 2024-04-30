"use client";
import ResultTable from "@/components/ResultTable";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Course({ params }) {
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

  const getProgrammes = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/programmes`, {
      cache: "no-store",
    });
    const programmeData = await response.json();
    setProgrammes(programmeData);
    setLoading(false);
  };
  const getStudents = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/students`, {
      cache: "no-store",
    });
    const studentData = await response.json();
    setStudents(studentData);
    setLoading(false);
  };

  const getResults = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:3000/api/results/${params.course}`,
      {
        cache: "no-store",
      }
    );
    const resultData = await response.json();
    setResults(resultData);
    setLoading(false);
  };

  useEffect(() => {
    getResults();
    getStudents();
    getProgrammes();
  }, []);
  // console.log("students: ", students);
  // console.log("results: ", results);
  // console.log("params: ", params);

  return (
    <div className="flex flex-col space-y-4 items-center bg-[#F4F4F4] w-full h-[83vh] overflow-y-auto ">
      <div className="p-3 flex flex-row space-x-4 items-center bg-[#DFDFDF] w-full shadow">
        <div className="bg-white p-3">
          <p className="capitalize">Student Results for {course}</p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : students.length > 0 && results.length > 0 && programmes.length > 0 ? (
        <ResultTable
          students={students}
          results={results}
          programmes={programmes}
        />
      ) : (
        <p className="capitalize text-xl font-semibold">No data available</p>
      )}
    </div>
  );
}
