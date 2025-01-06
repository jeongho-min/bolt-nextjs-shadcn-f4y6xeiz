"use client";

import { Card } from "@/components/ui/card";
import type { Department } from "./types";

export function DepartmentCard({ icon: Icon, title, description }: Department) {
  return (
    <Card className="p-8 h-full bg-white hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary/20">
      <div className="flex flex-col items-start">
        <div className="p-3 rounded-xl bg-primary/5 mb-6">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
