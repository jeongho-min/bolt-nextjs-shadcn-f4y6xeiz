"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import type { Disease } from "./types";

interface DiseasePanelProps {
  disease: Disease | null;
  onClose: () => void;
}

export function DiseasePanel({ disease, onClose }: DiseasePanelProps) {
  useEffect(() => {
    if (disease) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [disease]);

  return (
    <AnimatePresence>
      {disease && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:w-2/3 bg-white shadow-xl overflow-y-auto"
          >
            <div className="p-8">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>

              <div className="pt-8">
                {disease.imagePath && (
                  <div className="w-[calc(100%+4rem)] -mx-8 mb-8">
                    <Image src={disease.imagePath} alt={disease.title} width={1200} height={800} className="w-full h-auto" />
                  </div>
                )}

                <div className="prose prose-gray max-w-none">
                  {disease.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
