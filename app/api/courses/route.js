import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: [
        {
          c_id: "asc",
        },
      ],
    });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching courses");
  }
}
