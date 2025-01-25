import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, description, order_num, is_active } = body;

    const category = await prisma.treatment_categories.update({
      where: { id: params.id },
      data: {
        name,
        description,
        order_num,
        is_active,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating treatment category:", error);
    return NextResponse.json({ error: "Failed to update treatment category" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.treatment_categories.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Treatment category deleted" });
  } catch (error) {
    console.error("Error deleting treatment category:", error);
    return NextResponse.json({ error: "Failed to delete treatment category" }, { status: 500 });
  }
}
