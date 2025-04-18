"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FacilitiesHero() {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=1920&auto=format&fit=crop"
        alt="한약재와 침구가 있는 한의원 진료실"
        fill
        className="object-cover object-center brightness-[0.6]"
        priority
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">시설안내</h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            최신 의료장비와 쾌적한 환경으로
            <br />
            환자분들의 편안한 치료를 약속드립니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
