"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BusinessHours } from "./business-hours";
import { ReservationDialog } from "./reservation-dialog";
import { PhoneDialog } from "./dialogs/phone-dialog";
import { QUICK_LINKS } from "./constants";

declare global {
  interface Window {
    Kakao: any;
  }
}

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
