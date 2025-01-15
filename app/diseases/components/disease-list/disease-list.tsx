"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { diseases } from "./data";
import { TinnitusPanel } from "./panels/tinnitus-panel";
import { SuddenHearingLossPanel } from "./panels/sudden-hearing-loss-panel";
import { DizzinessPanel } from "./panels/dizziness-panel";
import { BPPVPanel } from "./panels/bppv-panel";
import { MenierePanel } from "./panels/meniere-panel";
import { VestibularNeuritisPanel } from "./panels/vestibular-neuritis-panel";
import { EarFullnessPanel } from "./panels/ear-fullness-panel";
import { HeadachePanel } from "./panels/headache-panel";
import { useHeader } from "@/app/providers/header-provider";
import { ArrowUpRight } from "lucide-react";
import type { Disease } from "./types";

export function DiseaseList() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const { setHeaderVisible } = useHeader();

  const handlePanelOpen = (disease: Disease) => {
    setHeaderVisible(false);
    setSelectedDisease(disease);
  };

  const handlePanelClose = () => {
    setHeaderVisible(true);
    setSelectedDisease(null);
  };

  const renderDiseasePanel = () => {
    if (!selectedDisease) return null;

    switch (selectedDisease.id) {
      case "tinnitus":
        return <TinnitusPanel disease={selectedDisease} onClose={handlePanelClose} />;
      case "sudden-hearing-loss":
        return <SuddenHearingLossPanel disease={selectedDisease} onClose={handlePanelClose} />;
      case "dizziness":
        return <DizzinessPanel disease={selectedDisease} onClose={handlePanelClose} />;
      case "bppv":
        return <BPPVPanel disease={selectedDisease} onClose={handlePanelClose} />;
      case "meniere":
        return <MenierePanel disease={selectedDisease} onClose={handlePanelClose} />;
      case "vestibular-neuritis":
        return <VestibularNeuritisPanel disease={selectedDisease} onClose={handlePanelClose} />;
      case "ear-fullness":
        return <EarFullnessPanel disease={selectedDisease} onClose={handlePanelClose} />;
      case "headache":
        return <HeadachePanel disease={selectedDisease} onClose={handlePanelClose} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {diseases.map((disease, index) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="group relative border-b border-gray-200 py-14 px-8 -mx-8 cursor-pointer transition-all duration-300
                  hover:bg-gray-50/80 hover:px-16 hover:shadow-[inset_0_1px_0_0_rgba(0,0,0,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.1)]"
                onClick={() => handlePanelOpen(disease)}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-primary/80 rounded-r transition-all duration-300 group-hover:h-16" />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                      {disease.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed group-hover:translate-x-2 transition-all duration-300 delay-[50ms]">
                      {disease.description}
                    </p>
                  </div>
                  <div className="ml-8 mt-2">
                    <div
                      className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center 
                      group-hover:bg-primary group-hover:scale-110 group-hover:rotate-45 transition-all duration-300"
                    >
                      <ArrowUpRight className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {renderDiseasePanel()}
    </section>
  );
}
