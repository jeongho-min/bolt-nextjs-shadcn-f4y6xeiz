"use client";

import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";
import { Phone } from "lucide-react";
import { navigation } from "./navigation-data";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm md:hidden">
      <div className="flex flex-col h-full p-4">
        <div className="space-y-1 mt-16">
          {navigation.map((item) => (
            <NavLink key={item.name} href={item.href} onClick={onClose}>
              {item.name}
            </NavLink>
          ))}
          <Button variant="default" className="w-full mt-4">
            <Phone className="mr-2 h-4 w-4" />
            062-369-2075 (이명치료)
            <span className="ml-2 text-primary">(062-571-2222)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
