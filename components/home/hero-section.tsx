"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SLIDES } from "./hero-slider/slide-data";
import { SlideNavigation } from "./hero-slider/slide-navigation";
import { QuickLinks } from "./quick-links";

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.05,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

const overlayVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[calc(100vh-50px)]">
      {/* Background Images */}
      <div className="relative h-full overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
            }}
          >
            <Image src={slide.image} alt="배경 이미지" fill className="object-cover" priority={index === 0} />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        ))}
      </div>

      {/* Fixed Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {/* <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              소리청한의원
            </h1>
            <p className="text-2xl text-white/90 mb-8 max-w-2xl">
              소리청은 여러분의 또 다른 가족입니다.
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
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <SlideNavigation total={HERO_SLIDES.length} current={currentSlide} onSelect={setCurrentSlide} />

      {/* Quick Links */}
    </section>
  );
}
