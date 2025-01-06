"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Disease } from "./types";

interface DiseasePanelProps {
  disease: Disease | null;
  onClose: () => void;
}

export function DiseasePanel({ disease, onClose }: DiseasePanelProps) {
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
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-primary/5">
                    <disease.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">{disease.title}</h2>
                </div>

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
