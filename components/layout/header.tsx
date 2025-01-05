"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "병원소개", href: "/about" },
  { name: "진료안내", href: "/services" },
  { name: "시설안내", href: "/facilities" },
  { name: "예약문의", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              소리철 일곡에스한방병원
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
            <Button variant="default" className="ml-4">
              <Phone className="mr-2 h-4 w-4" />
              062-369-2075
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="default" className="w-full mt-4">
                <Phone className="mr-2 h-4 w-4" />
                062-369-2075
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}