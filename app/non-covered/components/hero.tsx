"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function NonCoveredHero() {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden -mt-[88px]">
      {/* 배경 이미지 */}
      <Image
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1920&auto=format&fit=crop"
        alt="의료비용 안내"
        fill
        className="object-cover object-center brightness-[0.6]"
        priority
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4 pt-[88px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">비급여 진료비 안내</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            다음 안내되는 비용은 참고용이며
            <br />
            실제 진료비는 진료 내용과 환자 상태에 따라 변동될 수 있습니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
