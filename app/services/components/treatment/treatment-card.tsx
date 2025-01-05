"use client";

import { Card } from "@/components/ui/card";
import type { TreatmentStep } from "./types";

interface TreatmentCardProps extends TreatmentStep {
  isLast: boolean;
}

export function TreatmentCard({ icon: Icon, title, description, isLast }: TreatmentCardProps) {
  return (
    <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300">
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="relative">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        {!isLast && (
          <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200" />
        )}
      </div>
    </Card>
  );
}