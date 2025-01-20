import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Notice id is required", { status: 400 });
    }

    const notice = await prisma.notice.findUnique({
      where: {
        id: params.id,
      },
      include: {
        attachments: true,
      },
    });

    if (!notice) {
      return new NextResponse("공지사항을 찾을 수 없습니다.", { status: 404 });
    }

    // 조회수 증가
    await prisma.notice.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error("[NOTICE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { title, content, category, isImportant, startDate, endDate, attachments } = body;

    if (!params.id) {
      return new NextResponse("Notice id is required", { status: 400 });
    }

    // 기존 첨부파일 삭제
    await prisma.noticeAttachment.deleteMany({
      where: {
        noticeId: params.id,
      },
    });

    // 공지사항 업데이트
    const notice = await prisma.notice.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        content,
        category,
        isImportant,
        startDate,
        endDate,
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
    console.error("[NOTICE_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Notice id is required", { status: 400 });
    }

    // 첨부파일 먼저 삭제
    await prisma.noticeAttachment.deleteMany({
      where: {
        noticeId: params.id,
      },
    });

    // 공지사항 삭제
    await prisma.notice.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[NOTICE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
