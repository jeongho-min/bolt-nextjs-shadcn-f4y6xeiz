"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface BrandLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "minimal" | "wave" | "bounce";
}

export function BrandLoader({ className, variant = "default", ...props }: BrandLoaderProps) {
  if (variant === "minimal") {
    return (
      <div className={cn("relative flex flex-col items-center justify-center", className)} {...props}>
        <div className="relative w-16 h-16">
          <Image src="/icons/icon-512x512.png" alt="일곡에스한방병원 로고" fill className="object-contain animate-pulse" />
        </div>
        <div className="mt-4 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4AA8D8] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#4AA8D8] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#4AA8D8] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={cn("relative flex flex-col items-center justify-center", className)} {...props}>
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Image src="/icons/icon-512x512.png" alt="일곡에스한방병원 로고" width={60} height={60} className="object-contain z-10" />
          <div className="absolute inset-0 animate-[wave_2s_ease-in-out_infinite]">
            <div className="absolute inset-0 border-2 border-[#4AA8D8] rounded-full scale-0 animate-[ripple_2s_ease-out_infinite]" />
            <div className="absolute inset-0 border-2 border-[#4AA8D8] rounded-full scale-0 animate-[ripple_2s_ease-out_infinite_500ms]" />
          </div>
        </div>
        <div className="mt-4 text-sm font-medium text-[#4AA8D8]">일곡에스한방병원</div>
      </div>
    );
  }

  if (variant === "bounce") {
    return (
      <div className={cn("relative flex flex-col items-center justify-center", className)} {...props}>
        <div className="flex items-center gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-[#4AA8D8] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
        <div className="relative w-16 h-16">
          <Image src="/icons/icon-512x512.png" alt="일곡에스한방병원 로고" fill className="object-contain" />
        </div>
        <div className="mt-4 text-sm font-medium text-[#4AA8D8]">일곡에스한방병원</div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)} {...props}>
      <div className="relative w-20 h-20">
        {/* 로고 이미지 */}
        <div className="absolute inset-0 animate-pulse">
          <Image src="/icons/icon-512x512.png" alt="일곡에스한방병원 로고" fill className="object-contain" />
        </div>
        {/* 원형 로딩 애니메이션 */}
        <div className="absolute inset-0">
          <div className="w-full h-full border-4 border-[#4AA8D8]/30 rounded-full" />
          <div className="absolute inset-0 w-full h-full border-4 border-transparent border-t-[#4AA8D8] rounded-full animate-spin" />
        </div>
      </div>
      {/* 병원 이름 */}
      <div className="mt-4 text-sm font-medium text-[#4AA8D8] animate-pulse whitespace-nowrap">일곡에스한방병원</div>
    </div>
  );
}
