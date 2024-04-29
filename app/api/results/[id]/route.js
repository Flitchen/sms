import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const courseId = parseInt(params.id);
  // console.log("courseId: ", courseId);
  try {
    const courses = await prisma.exam.findMany({
      where: {
        c_id: courseId,
      },
      orderBy: [
        {
          marks: "desc",
        },
      ],
    });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching results");
  }
}

export async function PATCH(request, { params }) {
  let { s_id, c_id, e_id, marks } = await request.json();
  marks = marks.toLowerCase();

  // console.log(s_id);
  // console.log(c_id);
  // console.log(e_id);
  // console.log(marks);
  try {
    const updateMarks = await prisma.exam.update({
      where: {
        e_id,
      },
      data: {
        marks,
      },
    });

    if (!updateMarks) {
      throw new Error("Failed to update marks");
    } else {
      return NextResponse.json(
        {
          message: "Marks   updated successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update marks");
  }
}
