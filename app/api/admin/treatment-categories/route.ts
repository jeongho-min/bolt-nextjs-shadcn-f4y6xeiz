import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const categories = await prisma.treatment_categories.findMany({
      orderBy: {
        order_num: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[TREATMENT_CATEGORIES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, orderNum, isActive } = body;

    const category = await prisma.treatment_categories.create({
      data: {
        id: uuidv4(),
        name,
        description,
        order_num: orderNum,
        is_active: isActive,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[TREATMENT_CATEGORIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
