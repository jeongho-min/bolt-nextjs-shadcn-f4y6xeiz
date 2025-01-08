"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, MessageCircle, FileText, ArrowUp, MessagesSquare } from "lucide-react";

const HOSPITAL_ADDRESS = "광주광역시 북구 일곡동 840-2번지";
const KAKAO_MAPS_SEARCH_URL = `https://map.kakao.com/link/to/${encodeURIComponent("소리청한의원")},35.2034,126.8969`;

const QUICK_LINKS = [
  {
    icon: MapPin,
    label: "길찾기",
    onClick: () => {
      // 모바일에서는 카카오맵 앱으로 연결
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `kakaomap://route?ep=35.2034,126.8969&epa=${encodeURIComponent(HOSPITAL_ADDRESS)}&by=CAR`;
      } else {
        // PC에서는 카카오맵 웹으로 연결
        window.open(KAKAO_MAPS_SEARCH_URL, "_blank");
      }
    },
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverColor: "hover:bg-emerald-100",
  },
  {
    icon: MessageCircle,
    label: "상담하기",
    href: "/contact",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    icon: FileText,
    label: "치료사례",
    href: "/cases",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
  },
  {
    icon: MessagesSquare,
    label: "N상담",
    href: "/chat",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    hoverColor: "hover:bg-yellow-100",
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
  return (
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
                w-14 h-14 rounded-2xl flex items-center justify-center
                bg-white/95 backdrop-blur-sm
                transition-all duration-300 ease-out
                shadow-lg shadow-black/5
                group-hover:shadow-xl group-hover:shadow-black/10
                border border-gray-100
              `}
            >
              <IconComponent
                className={`
                  w-6 h-6 ${link.color}
                  transition-all duration-300
                  group-hover:scale-110
                `}
              />
              <div
                className={`
                absolute right-full mr-3 top-1/2 -translate-y-1/2
                px-3 py-1.5 rounded-lg
                bg-white/95 backdrop-blur-sm
                border border-gray-100
                shadow-lg shadow-black/5
                opacity-0 -translate-x-3
                group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-300 ease-out
                whitespace-nowrap
              `}
              >
                <span className="text-sm font-medium text-gray-700">{link.label}</span>
              </div>
            </div>
          </motion.div>
        );

        return link.onClick ? (
          <button key={link.label} onClick={link.onClick} className="focus:outline-none" aria-label={link.label}>
            {content}
          </button>
        ) : (
          <Link key={link.label} href={link.href} className="focus:outline-none" aria-label={link.label}>
            {content}
          </Link>
        );
      })}
    </motion.div>
  );
}
