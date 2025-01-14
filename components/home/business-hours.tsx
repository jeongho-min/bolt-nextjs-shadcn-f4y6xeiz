"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BusinessHours() {
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
