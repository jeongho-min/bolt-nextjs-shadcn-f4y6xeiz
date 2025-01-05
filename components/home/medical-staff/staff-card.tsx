"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import type { Doctor } from "./staff-data";

interface StaffCardProps extends Doctor {}

const MotionCard = motion(Card);

export const StaffCard = forwardRef<HTMLDivElement, StaffCardProps>(({ 
  name, 
  department, 
  position, 
  specialties, 
  education,
  certifications,
  image 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionCard className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative h-64">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <Badge variant="secondary">{position}</Badge>
            </div>
            <p className="text-white/90 text-sm mt-1">{department}</p>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-primary" />
              <h4 className="font-medium">전문 분야</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="font-normal">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              <h4 className="font-medium">학력</h4>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              {education.map((edu) => (
                <li key={edu}>{edu}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-primary" />
              <h4 className="font-medium">자격</h4>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </MotionCard>
    </motion.div>
  );
});

StaffCard.displayName = "StaffCard";