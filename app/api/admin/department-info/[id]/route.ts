import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, type, icon, description, order_num, is_active } = body;

    const departmentInfo = await prisma.department_info.update({
      where: { id: params.id },
      data: {
        name,
        type,
        icon,
        description,
        order_num,
        is_active,
      },
    });

    return NextResponse.json(departmentInfo);
  } catch (error) {
    console.error("Error updating department info:", error);
    return NextResponse.json({ error: "Failed to update department info" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.department_info.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Department info deleted" });
  } catch (error) {
    console.error("Error deleting department info:", error);
    return NextResponse.json({ error: "Failed to delete department info" }, { status: 500 });
  }
}
