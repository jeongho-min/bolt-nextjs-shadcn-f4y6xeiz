"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors relative group",
        isActive ? "text-primary" : "text-gray-700 hover:text-primary"
      )}
    >
      {children}
      <span
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}