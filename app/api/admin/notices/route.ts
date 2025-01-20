import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const notices = await prisma.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        attachments: true,
      },
    });

    return NextResponse.json(notices);
  } catch (error) {
    console.error("[NOTICES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { title, content, category, isImportant, startDate, endDate, attachments } = body;

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        category,
        isImportant,
        startDate,
        endDate,
        userId: session.user.id,
        attachments: attachments
          ? {
              createMany: {
                data: attachments.map((attachment: any) => ({
                  fileName: attachment.fileName,
                  fileUrl: attachment.fileUrl,
                  fileSize: attachment.fileSize,
                  mimeType: attachment.mimeType,
                })),
              },
            }
          : undefined,
      },
      include: {
        attachments: true,
      },
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error("[NOTICES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
