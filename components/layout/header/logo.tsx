"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

export function Logo() {
  const scrolled = useScroll();

  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className={cn(
        "relative flex items-center transition-all duration-300",
        scrolled ? "h-8" : "h-10"
      )}>
        <div className="relative flex items-center bg-primary/10 rounded-xl overflow-hidden p-2">
          <Leaf className={cn(
            "text-primary transition-transform duration-300 group-hover:scale-110",
            scrolled ? "h-5 w-5" : "h-6 w-6"
          )} />
        </div>
        <span className={cn(
          "ml-2 font-bold tracking-tight transition-all duration-300",
          scrolled ? "text-lg" : "text-xl"
        )}>
          소리청
        </span>
      </div>
    </Link>
  );
}