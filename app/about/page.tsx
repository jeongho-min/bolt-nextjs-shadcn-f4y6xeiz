"use client";

import { motion } from "framer-motion";
import { AboutHero } from "./components/about-hero";
import { EducationSection } from "./components/education-section";
import { GreetingSection } from "./components/greeting-section";
import { PhilosophySection } from "./components/philosophy-section";
import { HistorySection } from "@/components/home/history-section";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(2px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="overflow-hidden">
      <motion.div variants={childVariants}>
        <AboutHero />
      </motion.div>
      <motion.div variants={childVariants}>
        <GreetingSection />
      </motion.div>
      <motion.div variants={childVariants}>
        <EducationSection />
      </motion.div>
      <motion.div variants={childVariants}>
        <PhilosophySection />
      </motion.div>
    </motion.div>
  );
}
