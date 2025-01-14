"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ArrowUp, CalendarPlus, Copy, LucideIcon, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { BusinessHours } from "./business-hours";
import { ReservationDialog } from "./reservation-dialog";

const HOSPITAL_NAME = "소리청일곡에스한방병원";
const HOSPITAL_LAT = 35.202698;
const HOSPITAL_LNG = 126.89739;
const KAKAO_MAPS_SEARCH_URL = `https://map.kakao.com/link/map/${HOSPITAL_NAME},${HOSPITAL_LAT},${HOSPITAL_LNG}`;
const KAKAO_MAPS_NAVI_URL = `kakaomap://route?ep=${HOSPITAL_LAT},${HOSPITAL_LNG}&by=CAR`;
const KAKAO_CHANNEL_ID = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const PHONE_NUMBERS = [
  { number: "062-369-2075", label: "이명치료" },
  { number: "062-571-2222", label: null },
];

declare global {
  interface Window {
    Kakao: any;
  }
}

function PhoneDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const copyToClipboard = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
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
        <div className="flex flex-col items-center gap-6 py-4">
          {PHONE_NUMBERS.map((phone, index) => (
            <div key={phone.number} className="flex flex-col items-center gap-3">
              <div className="flex items-center">
                <p className="text-2xl font-bold text-primary">{phone.number}</p>
                {phone.label && <span className="ml-2 text-sm text-primary">({phone.label})</span>}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => copyToClipboard(phone.number)}>
                  <Copy className="w-4 h-4 mr-2" />
                  복사하기
                </Button>
                <Button onClick={() => (window.location.href = `tel:${phone.number}`)}>
                  <Phone className="w-4 h-4 mr-2" />
                  전화걸기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

type QuickLink = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  color: string;
  bgColor: string;
  hoverColor: string;
};

const QUICK_LINKS: QuickLink[] = [
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
    icon: CalendarPlus,
    label: "예약하기",
    onClick: undefined,
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
    onClick: undefined,
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
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);

  const handlePhoneClick = () => {
    setIsPhoneDialogOpen(true);
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
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-all duration-300 ease-out shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 border border-gray-100`}
              >
                <IconComponent className={`w-5 h-5 ${link.color} transition-all duration-300 group-hover:scale-110 mb-0.5`} />
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

          if (link.label === "예약하기") {
            return (
              <button key={link.label} onClick={() => setIsReservationDialogOpen(true)} className="focus:outline-none" aria-label={link.label}>
                {content}
              </button>
            );
          }

          return link.onClick ? (
            <button key={link.label} onClick={link.onClick} className="focus:outline-none" aria-label={link.label}>
              {content}
            </button>
          ) : null;
        })}
      </motion.div>

      <PhoneDialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen} />
      <ReservationDialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen} />
      <BusinessHours />
    </>
  );
}
