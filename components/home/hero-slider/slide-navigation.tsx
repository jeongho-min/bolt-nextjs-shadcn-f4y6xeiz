"use client";

interface SlideNavigationProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function SlideNavigation({ total, current, onSelect }: SlideNavigationProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i === current 
              ? "bg-white scale-100" 
              : "bg-white/50 scale-75 hover:scale-90 hover:bg-white/70"
          }`}
          aria-label={`슬라이드 ${i + 1}`}
        />
      ))}
    </div>
  );
}