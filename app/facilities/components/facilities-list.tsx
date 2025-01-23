"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const facilities = [
  {
    title: "병원 전경",
    description: "소리청 일곡에스한방병원 전경",
    images: ["/facility/병원전경.webp"],
  },
  {
    title: "접수실",
    description: "친절한 상담과 접수를 도와드립니다",
    images: ["/facility/접수실.webp"],
  },
  {
    title: "간호사실",
    description: "전문적인 간호 서비스를 제공합니다",
    images: ["/facility/간호사실.webp"],
  },
  {
    title: "X-ray실",
    description: "정확한 진단을 위한 영상 검사실",
    images: ["/facility/x-ray_2.webp"],
  },
  {
    title: "도수치료실",
    description: "전문적인 도수치료와 재활치료를 제공합니다",
    images: ["/facility/도수치료실.webp"],
  },
  {
    title: "한방요법실",
    description: "다양한 한방치료를 제공합니다",
    images: ["/facility/한방요법실_1.webp"],
  },
  {
    title: "황토방",
    description: "건강한 치료를 위한 황토 찜질 시설",
    images: ["/facility/황토방_1.webp"],
  },
  {
    title: "건식 반식욕기",
    description: "효과적인 치료를 위한 반신욕 시설",
    images: ["/facility/건식_반식욕기.webp"],
  },
  {
    title: "청각검사실",
    description: "청각검사를 위한 시설",
    images: ["/facility/청각검사실_2.jpg"],
  },
  // {
  //   title: "경옥고",
  //   description: "전통 한방 보약 제조실",
  //   images: ["/facility/경옥고.webp"],
  // },
];

function ImageViewer({ images, currentIndex }: { images: string[]; currentIndex: number }) {
  return (
    <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
      <Image src={images[currentIndex]} alt="Facility image" fill sizes="(max-width: 1280px) 100vw, 1280px" quality={85} priority className="object-cover" />
    </div>
  );
}

export function FacilitiesList() {
  const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentFacility = facilities[currentFacilityIndex];

  const handlePrevFacility = () => {
    setCurrentFacilityIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
    setCurrentImageIndex(0);
  };

  const handleNextFacility = () => {
    setCurrentFacilityIndex((prev) => (prev + 1) % facilities.length);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentFacility.images.length) % currentFacility.images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentFacility.images.length);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">주요 시설</h2>
          <p className="text-gray-600">환자 중심의 편안하고 쾌적한 의료 환경을 제공합니다</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFacilityIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <ImageViewer images={currentFacility.images} currentIndex={currentImageIndex} />

                {/* 시설 정보 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{currentFacility.title}</h3>
                  <p className="text-white/90">{currentFacility.description}</p>
                </div>

                {/* 이미지 네비게이션 */}
                {currentFacility.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* 시설 네비게이션 */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-10"
              onClick={handlePrevFacility}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-10"
              onClick={handleNextFacility}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* 이미지 인디케이터 */}
          {currentFacility.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {currentFacility.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-primary" : "bg-gray-300"}`}
                />
              ))}
            </div>
          )}

          {/* 시설 인디케이터 */}
          <div className="flex justify-center gap-2 mt-6">
            {facilities.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentFacilityIndex(index);
                  setCurrentImageIndex(0);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentFacilityIndex ? "bg-primary" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
