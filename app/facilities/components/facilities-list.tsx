"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
    images: ["/facility/x-ray_1.webp", "/facility/x-ray_2.webp"],
  },
  {
    title: "도수치료실",
    description: "전문적인 도수치료와 재활치료를 제공합니다",
    images: ["/facility/도수치료실.webp"],
  },
  {
    title: "한방요법실",
    description: "다양한 한방치료를 제공합니다",
    images: ["/facility/한방요법실_1.webp", "/facility/한방요법실_2.webp"],
  },
  {
    title: "황토방",
    description: "건강한 치료를 위한 황토 찜질 시설",
    images: ["/facility/황토방_1.webp", "/facility/황토방_2.webp"],
  },
  {
    title: "건식 반식욕기",
    description: "효과적인 치료를 위한 반신욕 시설",
    images: ["/facility/건식_반식욕기.webp"],
  },
  {
    title: "청각검사실",
    description: "청각검사를 위한 시설",
    images: ["/facility/청각검사실_1.jpg", "/facility/청각검사실_2.jpg", "/facility/청각검사실_3.jpg"],
  },
  // {
  //   title: "경옥고",
  //   description: "전통 한방 보약 제조실",
  //   images: ["/facility/경옥고.webp"],
  // },
];

function ImageModal({ isOpen, onClose, images, currentIndex }: { isOpen: boolean; onClose: () => void; images: string[]; currentIndex: number }) {
  const [imageIndex, setImageIndex] = useState(currentIndex);

  useEffect(() => {
    setImageIndex(currentIndex);
  }, [currentIndex]);

  if (!isOpen) return null;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute right-6 top-6 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full max-w-5xl max-h-[90vh] m-4">
        <div className="relative w-full h-full">
          <Image
            src={images[imageIndex]}
            alt="Facility image"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={85}
            priority
            className="object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FacilityCard({ facility }: { facility: (typeof facilities)[0] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (facility.images.length <= 1) return;

    // 이미지 프리로딩
    const preloadImages = facility.images.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % facility.images.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      // 메모리 정리
      preloadImages.forEach((img) => (img.src = ""));
    };
  }, [facility.images]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + facility.images.length) % facility.images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % facility.images.length);
  };

  return (
    <>
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="relative h-64">
          <div className="relative w-full h-full">
            {facility.images.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`${facility.title} ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
                quality={75}
                className={`object-cover absolute inset-0 transition-opacity duration-300 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {facility.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white mb-2">{facility.title}</h3>
            <p className="text-white/90 text-sm">{facility.description}</p>
          </div>
        </div>
      </Card>

      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} images={facility.images} currentIndex={currentImageIndex} />
    </>
  );
}

export function FacilitiesList() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FacilityCard facility={facility} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
