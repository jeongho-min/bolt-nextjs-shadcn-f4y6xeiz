"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ProcessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  total: number;
}

export function ProcessCard({ icon: Icon, title, description, index, total }: ProcessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex-1"
    >
      <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="relative">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          {index < total - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200" />
          )}
        </div>
      </Card>
    </motion.div>
  );
}