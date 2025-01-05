"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px]">
      <Image
        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80"
        alt="병원 전경"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              소리청 일곡에스한방병원
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              정성과 신뢰로 여러분의 건강을 지켜드리는 소리청 일곡에스한방병원입니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}