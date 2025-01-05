"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const facilities = [
  {
    id: 1,
    name: "진료실",
    description: "최신 의료장비를 갖춘 쾌적한 진료공간",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "검사실",
    description: "정확한 진단을 위한 첨단 검사장비",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "치료실",
    description: "편안한 치료를 위한 프라이빗 공간",
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?auto=format&fit=crop&q=80",
  },
];

export function FacilitySection() {
  const [currentFacility, setCurrentFacility] = useState(0);

  const nextFacility = () => {
    setCurrentFacility((prev) => (prev + 1) % facilities.length);
  };

  const prevFacility = () => {
    setCurrentFacility((prev) => (prev - 1 + facilities.length) % facilities.length);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">시설 안내</h2>
          <p className="text-gray-600">최신 의료장비와 쾌적한 환경을 제공합니다</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFacility}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src={facilities[currentFacility].image}
                alt={facilities[currentFacility].name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {facilities[currentFacility].name}
                </h3>
                <p className="text-white/90">
                  {facilities[currentFacility].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevFacility}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextFacility}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {facilities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFacility(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentFacility
                  ? "bg-primary scale-100"
                  : "bg-gray-300 scale-75 hover:scale-90"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}