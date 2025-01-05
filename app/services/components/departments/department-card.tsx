"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Department } from "./types";

export function DepartmentCard({ icon: Icon, title, description, specialties }: Department) {
  return (
    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <Badge 
            key={specialty} 
            variant="secondary"
            className="font-normal"
          >
            {specialty}
          </Badge>
        ))}
      </div>
    </Card>
  );
}