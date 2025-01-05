import type { LucideIcon } from "lucide-react";

export interface Department {
  icon: LucideIcon;
  title: string;
  description: string;
  specialties: string[];
}

export interface TreatmentStep {
  icon: LucideIcon;
  title: string;
  description: string;
}