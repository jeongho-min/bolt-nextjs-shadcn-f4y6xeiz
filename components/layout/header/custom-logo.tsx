"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

export function CustomLogo() {
  const scrolled = useScroll();

  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className={cn(
        "relative transition-all duration-300",
        scrolled ? "h-8" : "h-10"
      )}>
        <svg
          viewBox="0 0 100 100"
          className={cn(
            "text-primary transition-transform duration-300 group-hover:scale-110",
            scrolled ? "h-8" : "h-10"
          )}
        >
          <path
            d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            d="M50 20 C35 20 25 35 25 50 C25 65 35 80 50 80 C65 80 75 65 75 50 C75 35 65 20 50 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M50 35 L50 65 M35 50 L65 50"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span 
        className={cn(
          "font-bold tracking-tight transition-all duration-300",
          scrolled ? "text-lg" : "text-xl"
        )}
        style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        소리철 일곡에스한방병원
      </span>
    </Link>
  );
}