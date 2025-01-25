"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BusinessHours } from "./business-hours";
import { ReservationDialog } from "../layout/dialogs/reservation-dialog";
import { NonMemberDialog } from "../layout/dialogs/non-member-reservation-dialog";
import { PhoneDialog } from "./dialogs/phone-dialog";
import { QUICK_LINKS } from "./constants";
import { useAuth } from "@/app/providers/auth-provider";
import { Settings, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

interface QuickLinkItemProps {
  icon: React.ElementType;
  label: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  onClick?: () => void;
}

const QuickLinkItem = ({ icon: IconComponent, label, color, bgColor, hoverColor, onClick }: QuickLinkItemProps) => {
  const content = (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
      <div
        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-300 ${bgColor} ${hoverColor}`}
      >
        <IconComponent className={`w-5 h-5 ${color} transition-all duration-300 group-hover:scale-110`} />
        <span className={`text-[10px] font-medium ${color} mt-0.5`}>{label}</span>
      </div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none" aria-label={label}>
        {content}
      </button>
    );
  }

  return content;
};

const AdminLink = () => {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") return null;

  return (
    <Link href="/admin" className="focus:outline-none" aria-label="관리자">
      <QuickLinkItem icon={Settings} label="관리자" color="text-purple-500" bgColor="" hoverColor="" />
    </Link>
  );
};

const ToggleButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="focus:outline-none"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={isOpen ? "메뉴 접기" : "메뉴 펼치기"}
  >
    <div
      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 hover:bg-gray-100`}
    >
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-500 transition-all duration-300 group-hover:scale-110" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500 transition-all duration-300 group-hover:scale-110" />
      )}
      <span className="text-[10px] font-medium text-gray-500 mt-0.5">{isOpen ? "접기" : "펼치기"}</span>
    </div>
  </motion.button>
);

export function QuickLinks() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);
  const [isNonMemberReservationDialogOpen, setIsNonMemberReservationDialogOpen] = useState(false);

  const handlePhoneClick = () => setIsPhoneDialogOpen(true);
  const handleReservationClick = () => {
    if (isAuthenticated) {
      setIsReservationDialogOpen(true);
    } else {
      setIsNonMemberReservationDialogOpen(true);
    }
  };

  return (
    <>
      <div className="fixed right-6 bottom-24 z-50">
        <div className="flex flex-col items-end">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-2 mb-2"
              >
                <AdminLink />
                {QUICK_LINKS.map((link) => {
                  if (link.label === "전화문의") {
                    return <QuickLinkItem key={link.label} {...link} onClick={handlePhoneClick} />;
                  }

                  if (link.label === "예약하기") {
                    return <QuickLinkItem key={link.label} {...link} onClick={handleReservationClick} />;
                  }

                  if (link.onClick) {
                    return <QuickLinkItem key={link.label} {...link} />;
                  }

                  return null;
                })}
              </motion.div>
            )}
          </AnimatePresence>
          <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      <PhoneDialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen} />
      {isAuthenticated ? (
        <ReservationDialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen} />
      ) : (
        <NonMemberDialog open={isNonMemberReservationDialogOpen} onOpenChange={setIsNonMemberReservationDialogOpen} />
      )}
      <BusinessHours />
    </>
  );
}
