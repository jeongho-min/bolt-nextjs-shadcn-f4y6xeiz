"use client";

import { motion } from "framer-motion";
import { DiseasesHero } from "./components/diseases-hero";
import { DiseaseList } from "./components/disease-list/disease-list";

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

export default function DiseasesPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="overflow-hidden">
      <motion.div variants={childVariants}>
        <DiseasesHero />
      </motion.div>
      <motion.div variants={childVariants}>
        <DiseaseList />
      </motion.div>
    </motion.div>
  );
}
