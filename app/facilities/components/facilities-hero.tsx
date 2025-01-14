"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FacilitiesHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px]">
      <div className="absolute inset-0 overflow-hidden">
        <Image src="facility/원무과_1.jpg" alt="소리청 원무과" fill className="object-cover scale-[1.02] blur-[2px]" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">시설 안내</h1>
            <p className="text-xl text-white/90">최신 의료장비와 쾌적한 환경으로 최상의 진료 서비스를 제공합니다.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
