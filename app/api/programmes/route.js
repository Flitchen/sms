import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const programmes = await prisma.programme.findMany();
    return NextResponse.json(programmes, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching programmes");
  }
}
