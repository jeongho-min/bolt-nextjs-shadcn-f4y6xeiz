import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Review } from "./review-data";

export function ReviewCard({ name, department, rating, content, date }: Review) {
  return (
    <Card className="p-6 w-full h-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 border-none shadow-lg hover:shadow-xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-primary/80">{department}</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
        <p className="text-xs text-gray-400 mt-auto">{date}</p>
      </div>
    </Card>
  );
}
