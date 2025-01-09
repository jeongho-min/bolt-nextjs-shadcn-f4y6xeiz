"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.5]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[600px] overflow-hidden">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <motion.div style={{ filter: `brightness(${brightness})` }} className="relative w-full h-full">
          <Image src="/sub/sub_vis_bg3.jpg" alt="진료 안내" fill className="object-cover object-center" priority />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"
          style={{ opacity: overlayOpacity }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-6"
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
