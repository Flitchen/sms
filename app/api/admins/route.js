import { prisma } from "@/config/db";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany();
    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching admins");
  }
}

export async function POST(request) {
  let { fname, mname, lname, phone } = await request.json();
  fname = fname.toLowerCase();
  mname = mname.toLowerCase();
  lname = lname.toLowerCase();
  const password = hashSync(phone, 10);

  try {
    if (!fname || !lname || !phone) {
      throw new Error(
        "Some fields weren't filled! Please fill all the required fields "
      );
    }

    const username = phone;
    const usernameExists = await prisma.admin.findUnique({
      where: {
        phone: username,
      },
    });
    if (usernameExists) {
      throw new Error("Admin already exists");
    }

    //insert admin
    const newUser = await prisma.admin.create({
      data: {
        fname,
        mname,
        lname,
        password,
        phone,
      },
    });

    if (!newUser) {
      throw new Error("Failed to add admin");
    } else {
      return NextResponse.json(
        {
          message: "Admin was added successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add admin");
  }
}
