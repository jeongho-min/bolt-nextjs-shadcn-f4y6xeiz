"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  name: string;
  department: string;
  rating: number;
  content: string;
  date: string;
}

export function ReviewCard({ name, department, rating, content, date }: ReviewCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-3 right-3 opacity-5">
        <Quote className="w-24 h-24 rotate-12" />
      </div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium">{name}</h4>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {department}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < rating 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {content}
        </p>
        <time className="text-xs text-gray-400 font-medium">
          {date}
        </time>
      </div>
    </motion.div>
  );
}