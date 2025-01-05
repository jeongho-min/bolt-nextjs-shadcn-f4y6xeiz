"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ServicesHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px]">
      <Image
        src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80"
        alt="진료 안내"
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
              진료 안내
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              소리청 일곡에스한방병원의 전문적인 진료 과목과 치료 과정을 안내해드립니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}