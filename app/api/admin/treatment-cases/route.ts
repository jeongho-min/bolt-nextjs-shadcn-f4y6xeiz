import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const treatmentCases = await prisma.treatment_cases.findMany({
      include: {
        treatment_categories: true,
      },
      orderBy: {
        order_num: "asc",
      },
    });

    return NextResponse.json(treatmentCases);
  } catch (error) {
    console.error("Failed to fetch treatment cases:", error);
    return NextResponse.json({ error: "Failed to fetch treatment cases" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, date, category_id, is_active } = body;

    const treatmentCase = await prisma.treatment_cases.create({
      data: {
        id: uuidv4(),
        title,
        description,
        date: new Date(date),
        is_active,
        order_num: 0,
        treatment_categories: {
          connect: {
            id: category_id,
          },
        },
      },
      include: {
        treatment_categories: true,
      },
    });

    return NextResponse.json(treatmentCase);
  } catch (error) {
    console.error("[TREATMENT_CASES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
