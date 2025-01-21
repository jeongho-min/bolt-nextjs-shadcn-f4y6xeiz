"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Notice, NoticeCategory } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight, Bell, CalendarDays, Gift, Megaphone, X, FileIcon, Download } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { TipTapViewer } from "@/components/editor/tiptap-viewer";

interface Attachment {
  id: string;
  noticeId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string | null;
  createdAt: Date;
}

interface NoticeWithAttachments extends Notice {
  attachments: Attachment[];
}

interface NoticeSectionProps {
  notices: NoticeWithAttachments[];
  isLoading: boolean;
}

const categoryIcons = {
  NOTICE: Bell,
  INFO: Megaphone,
  EVENT: Gift,
};

const categoryLabels = {
  NOTICE: "공지",
  INFO: "안내",
  EVENT: "이벤트",
};

const categoryColors = {
  NOTICE: "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20",
  INFO: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/20",
  EVENT: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border-orange-500/20",
};

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    y: -3,
    transition: {
      duration: 0.2,
    },
  },
};

export function NoticeSection({ notices, isLoading }: NoticeSectionProps) {
  const [selectedNotice, setSelectedNotice] = useState<NoticeWithAttachments | null>(null);

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const formatHtmlContent = (html: string) => {
    // 빈 p 태그 제거
    let formatted = html.replace(/<p><\/p>/g, "");
    // p 태그 사이의 불필요한 공백 제거
    formatted = formatted.replace(/<\/p>\s*<p>/g, "</p><p>");
    // 연속된 br 태그를 하나로 통일
    formatted = formatted.replace(/(<br\s*\/?>\s*)+/g, "<br>");
    // 줄바꿈 유지를 위한 스타일 추가
    formatted = formatted.replace(/<p>/g, '<p style="margin-bottom: 1rem;">');
    return formatted;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-32 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!notices || notices.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">공지사항</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">일곡에스한방병원의 새로운 소식을 알려드립니다</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="mt-8 text-center space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">아직 등록된 공지사항이 없어요</h3>
                  <p className="text-gray-500">새로운 소식이 등록되면 이곳에서 확인하실 수 있습니다</p>
                </div>

                <div className="pt-6 border-t border-dashed w-full max-w-xs mx-auto">
                  <p className="text-sm text-gray-400">매주 새로운 소식과 이벤트로 찾아뵙겠습니다</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">공지사항</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">일곡에스한방병원의 새로운 소식을 알려드립니다</p>
        </motion.div>

        <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "50px" }} className="grid gap-6 max-w-4xl mx-auto">
          {notices.map((notice) => {
            const Icon = categoryIcons[notice.category];
            return (
              <motion.div key={notice.id} variants={cardAnimation} whileHover="hover" className="will-change-transform">
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer"
                  onClick={() => setSelectedNotice(notice)}
                >
                  <div className="p-6 flex items-center gap-6">
                    <div className={`shrink-0 w-12 h-12 rounded-full ${categoryColors[notice.category]} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${categoryColors[notice.category]} border`} variant="outline">
                          {categoryLabels[notice.category]}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          {format(new Date(notice.createdAt), "yyyy.MM.dd", { locale: ko })}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-colors">{notice.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-1">{stripHtmlTags(notice.content)}</p>
                    </div>
                    <div className="shrink-0 flex items-center text-gray-400 group-hover:text-primary transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {selectedNotice && (
                <Badge className={`${categoryColors[selectedNotice.category]} border`} variant="outline">
                  {categoryLabels[selectedNotice.category]}
                </Badge>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="w-4 h-4 mr-1" />
                {selectedNotice && format(new Date(selectedNotice.createdAt), "yyyy.MM.dd", { locale: ko })}
              </div>
            </div>
            <DialogTitle className="text-xl font-bold">{selectedNotice?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedNotice && (
              <>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <TipTapViewer content={selectedNotice.content} />
                </div>
                {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">첨부파일</h3>
                    <div className="grid gap-3">
                      {selectedNotice.attachments.map((attachment) => {
                        const isImage = attachment.mimeType?.startsWith("image/") || attachment.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);

                        return isImage ? (
                          <div key={attachment.id} className="relative">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={attachment.fileUrl}
                                alt={attachment.fileName}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 800px"
                              />
                            </div>
                            <a
                              href={attachment.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/50 hover:bg-black/70 text-white text-xs font-medium backdrop-blur-sm transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              원본 보기
                            </a>
                          </div>
                        ) : (
                          <a
                            key={attachment.id}
                            href={attachment.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                          >
                            <FileIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{attachment.fileName}</span>
                            <Download className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
