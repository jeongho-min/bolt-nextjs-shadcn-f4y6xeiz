"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";
import { Logo } from "./logo";
import { navigation } from "./navigation-data";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  });

  return (
    <motion.header
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", lastScrollY > 20 ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white")}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
            <Button variant="default" className="ml-4 font-medium" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              <Phone className="mr-2 h-4 w-4" />
              062-369-2075 (이명치료)
              <span className="ml-2 text-primary">(062-571-2222)</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button type="button" className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="sr-only">메뉴 열기</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={cn("w-full h-0.5 bg-gray-600 transition-all duration-300", mobileMenuOpen && "rotate-45 translate-y-2")} />
                <span className={cn("w-full h-0.5 bg-gray-600 transition-opacity duration-300", mobileMenuOpen && "opacity-0")} />
                <span className={cn("w-full h-0.5 bg-gray-600 transition-all duration-300", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </motion.header>
  );
}
