"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronRight, Megaphone, Bell, Gift } from "lucide-react";
import Link from "next/link";

type Notice = {
  id: string;
  title: string;
  content: string;
  category: "공지" | "안내" | "이벤트";
  createdAt: string;
};

const recentNotices: Notice[] = [
  {
    id: "1",
    title: "2024년 설 연휴 진료 안내",
    content: "설 연휴 기간 동안의 진료 일정을 안내드립니다.",
    category: "공지",
    createdAt: "2024-02-01",
  },
  {
    id: "2",
    title: "일곡에스한방병원 상담 예약 서비스 오픈",
    content: "온라인으로 편리하게 상담 예약이 가능합니다.",
    category: "안내",
    createdAt: "2024-01-25",
  },
  {
    id: "3",
    title: "2024년 건강보험 한방 급여 항목 변경 안내",
    content: "2024년부터 변경되는 한방 급여 항목을 안내드립니다.",
    category: "안내",
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    title: "겨울철 건강관리 한방치료 프로모션",
    content: "겨울철 면역력 강화를 위한 특별 프로모션을 진행합니다.",
    category: "이벤트",
    createdAt: "2024-01-10",
  },
];

const categoryIcons = {
  공지: Bell,
  안내: Megaphone,
  이벤트: Gift,
};

const categoryColors = {
  공지: "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20",
  안내: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/20",
  이벤트: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border-orange-500/20",
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

export function NoticeSection() {
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
          {recentNotices.map((notice, index) => {
            const Icon = categoryIcons[notice.category];
            return (
              <motion.div key={notice.id} variants={cardAnimation} whileHover="hover" className="will-change-transform">
                <Link href={`/notices/${notice.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white group">
                    <div className="p-6 flex items-center gap-6">
                      <div className={`shrink-0 w-12 h-12 rounded-full ${categoryColors[notice.category]} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${categoryColors[notice.category]} border`} variant="outline">
                            {notice.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            {notice.createdAt}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-colors">{notice.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-1">{notice.content}</p>
                      </div>
                      <div className="shrink-0 flex items-center text-gray-400 group-hover:text-primary transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 hover:bg-primary/10 text-primary font-medium transition-colors"
          >
            전체 공지사항 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
