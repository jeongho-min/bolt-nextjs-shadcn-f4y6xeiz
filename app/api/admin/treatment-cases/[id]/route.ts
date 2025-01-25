import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description, date, categoryId, orderNum, isActive } = body;

    const treatmentCase = await prisma.treatment_cases.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        date: new Date(date),
        category_id: categoryId,
        order_num: orderNum,
        is_active: isActive,
      },
      include: {
        treatment_categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(treatmentCase);
  } catch (error) {
    console.error("[TREATMENT_CASES_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description, date, category_id, is_active } = body;

    const treatmentCase = await prisma.treatment_cases.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        date: new Date(date),
        is_active,
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
    console.error("[TREATMENT_CASES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await prisma.treatment_cases.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Treatment case deleted successfully" });
  } catch (error) {
    console.error("Failed to delete treatment case:", error);
    return NextResponse.json({ error: "Failed to delete treatment case" }, { status: 500 });
  }
}
