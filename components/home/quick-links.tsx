"use client";

import { motion } from "framer-motion";
import { ArrowUp, Clock, MapPin, MessageCircle, Phone, Copy } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const HOSPITAL_NAME = "소리청일곡에스한방병원";
const KAKAO_MAPS_SEARCH_URL = `https://map.kakao.com/link/search/${encodeURIComponent(HOSPITAL_NAME)}`;
const KAKAO_MAPS_NAVI_URL = `kakaomap://search?q=${encodeURIComponent(HOSPITAL_NAME)}&rt=`;
const KAKAO_CHANNEL_ID = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
const PHONE_NUMBER = "062-369-2075";

function PhoneDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      alert("전화번호가 복사되었습니다.");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>전화 문의</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-2xl font-bold text-primary">{PHONE_NUMBER}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              복사하기
            </Button>
            <Button onClick={() => (window.location.href = `tel:${PHONE_NUMBER}`)}>
              <Phone className="w-4 h-4 mr-2" />
              전화걸기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BusinessHours() {
  const [status, setStatus] = useState<"open" | "lunch" | "closed">("closed");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkBusinessHours = () => {
      const day = currentTime.getDay();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      // 일요일은 휴진
      if (day === 0) return "closed";

      // 점심시간 (12:30 - 14:30)
      const lunchStart = 12 * 60 + 30;
      const lunchEnd = 14 * 60 + 30;

      if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
        return "lunch";
      }

      // 토요일
      if (day === 6) {
        return currentMinutes >= 9 * 60 && currentMinutes < 13 * 60 ? "open" : "closed";
      }

      // 평일
      return currentMinutes >= 9 * 60 && currentMinutes < 17 * 60 + 30 ? "open" : "closed";
    };

    setStatus(checkBusinessHours());
  }, [currentTime]);

  const statusConfig = {
    open: {
      color: "bg-green-500",
      text: "영업중",
      ringColor: "ring-green-500/30",
    },
    lunch: {
      color: "bg-yellow-500",
      text: "점심시간",
      ringColor: "ring-yellow-500/30",
    },
    closed: {
      color: "bg-red-500",
      text: "영업종료",
      ringColor: "ring-red-500/30",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className={`
            bg-white shadow-lg border border-gray-200
            px-4 py-2 rounded-lg
            flex items-center gap-2
            ring-2 ${statusConfig[status].ringColor}
            cursor-help
          `}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[status].color} animate-pulse`} />
          <span className="text-sm font-semibold text-gray-800">{statusConfig[status].text}</span>
        </div>

        {/* 호버 시 보이는 영업시간 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
            scale: isHovered ? 1 : 0.95,
          }}
          className={`
            absolute bottom-full right-0 mb-2
            bg-white shadow-lg border border-gray-200
            p-4 rounded-lg min-w-[200px]
            ${isHovered ? "pointer-events-auto" : "pointer-events-none"}
          `}
        >
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold text-gray-800 border-b pb-2">진료시간 안내</h3>
            <div className="space-y-1.5">
              <p className="flex justify-between">
                <span className="text-gray-600">평일</span>
                <span className="font-medium">09:00 - 17:30</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">토요일</span>
                <span className="font-medium">09:00 - 13:00</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">점심시간</span>
                <span className="font-medium">12:30 - 14:30</span>
              </p>
              <p className="flex justify-between text-red-500 font-medium mt-2">
                <span>일요일/공휴일</span>
                <span>휴진</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const QUICK_LINKS = [
  {
    icon: MapPin,
    label: "길찾기",
    onClick: () => {
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = KAKAO_MAPS_NAVI_URL;
      } else {
        window.open(KAKAO_MAPS_SEARCH_URL, "_blank");
      }
    },
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverColor: "hover:bg-emerald-100",
  },
  {
    icon: Clock,
    label: "운영정보",
    href: "/contact",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-100",
  },
  {
    icon: MessageCircle,
    label: "상담하기",
    onClick: () => {
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `kakaoopen://plusfriend/home/@${KAKAO_CHANNEL_ID}`;
      } else {
        window.open(`https://pf.kakao.com/_${KAKAO_CHANNEL_ID}`, "_blank");
      }
    },
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    icon: Phone,
    label: "전화문의",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    hoverColor: "hover:bg-rose-100",
  },
  {
    icon: ArrowUp,
    label: "TOP",
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    hoverColor: "hover:bg-gray-100",
  },
];

export function QuickLinks() {
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  const handlePhoneClick = () => {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `tel:${PHONE_NUMBER}`;
    } else {
      setIsPhoneDialogOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5"
      >
        {QUICK_LINKS.map((link) => {
          const IconComponent = link.icon;
          const content = (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="relative group">
              <div
                className={`
                  w-14 h-14 rounded-2xl flex flex-col items-center justify-center
                  bg-white/95 backdrop-blur-sm
                  transition-all duration-300 ease-out
                  shadow-lg shadow-black/5
                  group-hover:shadow-xl group-hover:shadow-black/10
                  border border-gray-100
                `}
              >
                <IconComponent
                  className={`
                    w-5 h-5 ${link.color}
                    transition-all duration-300
                    group-hover:scale-110 mb-0.5
                  `}
                />
                <span className={`text-[10px] font-medium ${link.color}`}>{link.label}</span>
              </div>
            </motion.div>
          );

          if (link.label === "전화문의") {
            return (
              <button key={link.label} onClick={handlePhoneClick} className="focus:outline-none" aria-label={link.label}>
                {content}
              </button>
            );
          }

          return link.onClick ? (
            <button key={link.label} onClick={link.onClick} className="focus:outline-none" aria-label={link.label}>
              {content}
            </button>
          ) : link.href ? (
            <Link key={link.label} href={link.href} className="focus:outline-none" aria-label={link.label}>
              {content}
            </Link>
          ) : null;
        })}
      </motion.div>

      <PhoneDialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen} />
      <BusinessHours />
    </>
  );
}
