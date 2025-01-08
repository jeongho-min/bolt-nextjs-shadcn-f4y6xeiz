"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SLIDES } from "./hero-slider/slide-data";
import { SlideNavigation } from "./hero-slider/slide-navigation";
import { QuickLinks } from "./quick-links";

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
      <AnimatePresence mode="wait">
        {HERO_SLIDES.map(
          (slide, index) =>
            currentSlide === index && (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <Image src={slide.image} alt="배경 이미지" fill className="object-cover" priority={index === 0} />
                <div className="absolute inset-0 bg-black/30" />
              </motion.div>
            )
        )}
      </AnimatePresence>

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
      <QuickLinks />
    </section>
  );
}
