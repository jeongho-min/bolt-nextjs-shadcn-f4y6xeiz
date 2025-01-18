"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BusinessHours } from "./business-hours";
import { ReservationDialog } from "../layout/dialogs/reservation-dialog";
import { NonMemberDialog } from "../layout/dialogs/non-member-reservation-dialog";
import { PhoneDialog } from "./dialogs/phone-dialog";
import { QUICK_LINKS } from "./constants";
import { useAuth } from "@/app/providers/auth-provider";
import { Settings } from "lucide-react";
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
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="relative group">
      <div
        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-all duration-300 ease-out shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 border border-gray-100 ${bgColor} ${hoverColor}`}
      >
        <IconComponent className={`w-5 h-5 ${color} transition-all duration-300 group-hover:scale-110 mb-0.5`} />
        <span className={`text-[10px] font-medium ${color}`}>{label}</span>
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
      <QuickLinkItem icon={Settings} label="관리자" color="text-purple-500" bgColor="bg-purple-50" hoverColor="hover:bg-purple-100" />
    </Link>
  );
};

export function QuickLinks() {
  const { isAuthenticated } = useAuth();
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
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5"
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
