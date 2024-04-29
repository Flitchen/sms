import { prisma } from "@/config/db";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const students = await prisma.student.findMany();
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching students");
  }
}

export async function POST(request) {
  let { fname, mname, lname, gender, yearStarted, phone, programme } =
    await request.json();
  fname = fname.toLowerCase();
  mname = mname.toLowerCase();
  lname = lname.toLowerCase();
  gender = gender.toLowerCase();
  programme = programme.toLowerCase();
  yearStarted = Number.parseInt(yearStarted);
  const password = hashSync(phone, 10);

  try {
    if (!fname || !lname || !phone || !gender || !yearStarted) {
      throw new Error(
        "Some fields weren't filled! Please fill all the required fields "
      );
    }

    const username = phone;
    const usernameExists = await prisma.student.findUnique({
      where: {
        phone_number: username,
      },
    });
    if (usernameExists) {
      throw new Error("Student already exists");
    }

    const programmePresent = await prisma.programme.findUnique({
      where: {
        name: programme,
      },
    });

    let newProgramme;

    if (!programmePresent) {
      newProgramme = await prisma.programme.create({
        data: {
          name: programme,
        },
      });
      if (!newProgramme) {
        throw new Error("Failed to add programme");
      }
    }

    const programmeId = await prisma.programme.findUnique({
      where: {
        name: programme,
      },
      select: {
        p_id: true,
      },
    });

    //insert admin
    const newUser = await prisma.student.create({
      data: {
        fname,
        mname,
        lname,
        password,
        phone_number: phone,
        year_started: yearStarted,
        gender,
        p_id: programmeId.p_id,
      },
    });

    if (!newUser) {
      throw new Error("Failed to add student");
    } else {
      return NextResponse.json(
        {
          message: "Student was added successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add student");
  }
}
