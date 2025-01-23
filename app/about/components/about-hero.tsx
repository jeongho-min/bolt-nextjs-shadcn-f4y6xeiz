"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.5]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);

  return (
    <section ref={sectionRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <motion.div style={{ filter: `brightness(${brightness})` }} className="relative w-full h-full">
          <Image
            src={isMobile ? "/sub/인사말_히어로_모바일.png" : "/sub/인사말_히어로.png"}
            alt="현대식 병원 시설 이미지"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"
          style={{ opacity: overlayOpacity }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">원장 인사말</h1>
              <p className="text-lg text-white/90 leading-relaxed">
                20년 이상의 임상 경험을 바탕으로
                <br className="hidden md:block" />
                정성을 다해 진료하겠습니다
              </p>
            </motion.div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
