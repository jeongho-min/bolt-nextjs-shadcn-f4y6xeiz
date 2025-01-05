"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ReviewCard } from "./review-card";
import { MOCK_REVIEWS } from "./review-data";

export function ReviewsSection() {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const startAnimation = async () => {
      await controls.start({
        x: [0, -2000],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        },
      });
    };

    startAnimation();
  }, [controls, isClient]);

  if (!isClient) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
      {/* 기존 컴포넌트 내용 유지 */}
    </section>
  );
}