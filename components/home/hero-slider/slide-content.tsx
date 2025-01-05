"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SlideContentProps {
  title: string;
  subtitle: string;
  isVisible: boolean;
}

export function SlideContent({ title, subtitle, isVisible }: SlideContentProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-2xl text-white/90 mb-8 max-w-2xl">
            {subtitle}
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="font-medium">
              <Link href="/contact">진료예약</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="font-medium bg-white text-primary hover:bg-white/90"
            >
              <Link href="/cases">치료사례</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}