import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const departments = await prisma.department_info.findMany({
      orderBy: {
        order_num: "asc",
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error("[DEPARTMENT_INFO_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, icon, description, orderNum, isActive } = body;

    const department = await prisma.department_info.create({
      data: {
        id: uuidv4(),
        name,
        type,
        icon,
        description,
        order_num: orderNum,
        is_active: isActive,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.error("[DEPARTMENT_INFO_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
