"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SLIDES } from "./hero-slider/slide-data";
import { SlideNavigation } from "./hero-slider/slide-navigation";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-[calc(100vh-50px)] w-full">
      {/* Background Images */}
      <div className="relative h-full w-full overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={isMobile && slide.mobileImage ? slide.mobileImage : slide.image}
                alt="배경 이미지"
                fill
                sizes="100vw"
                quality={100}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover w-full h-full"
                priority={index === 0}
                style={{
                  objectPosition: isMobile ? "center top" : "center",
                  objectFit: "cover",
                  transform: isMobile ? "scale(1)" : "scale(1.2)",
                  transformOrigin: "center top",
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
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
