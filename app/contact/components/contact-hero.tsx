"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative h-[40vh] min-h-[400px]">
      <Image
        src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80"
        alt="예약 문의"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">예약 문의</h1>
            <p className="text-xl text-white/90">편리하게 진료 예약을 하실 수 있습니다</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
