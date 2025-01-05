"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, MessageCircle, FileText, ArrowUp, MessagesSquare } from "lucide-react";

const QUICK_LINKS = [
  { 
    icon: MapPin, 
    label: "지점찾기", 
    href: "/locations",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverColor: "hover:bg-emerald-100"
  },
  { 
    icon: MessageCircle, 
    label: "상담하기", 
    href: "/contact",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100"
  },
  { 
    icon: FileText, 
    label: "치료사례", 
    href: "/cases",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100"
  },
  { 
    icon: MessagesSquare, 
    label: "N상담", 
    href: "/chat",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    hoverColor: "hover:bg-yellow-100"
  },
  { 
    icon: ArrowUp, 
    label: "TOP", 
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    hoverColor: "hover:bg-gray-100"
  },
];

export function QuickLinks() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
    >
      {QUICK_LINKS.map((link) => {
        const IconComponent = link.icon;
        const content = (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-1"
          >
            <div className={`
              w-11 h-11 rounded-xl flex items-center justify-center
              shadow-md backdrop-blur-sm bg-white/90
              transition-all duration-300 relative
              ${link.hoverColor}
              before:absolute before:inset-0 
              before:rounded-xl before:opacity-0
              before:transition-opacity before:duration-300
              group-hover:before:opacity-100
              before:ring-2 before:ring-primary/20
            `}>
              <IconComponent className={`
                w-5 h-5 ${link.color}
                transition-transform duration-300
                group-hover:scale-110
              `} />
            </div>
            <span className={`
              text-[10px] font-medium
              transition-colors duration-300
              text-gray-500 group-hover:text-primary
            `}>
              {link.label}
            </span>
          </motion.div>
        );

        return link.onClick ? (
          <button
            key={link.label}
            onClick={link.onClick}
            className="focus:outline-none"
            aria-label={link.label}
          >
            {content}
          </button>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            className="focus:outline-none"
            aria-label={link.label}
          >
            {content}
          </Link>
        );
      })}
    </motion.div>
  );
}