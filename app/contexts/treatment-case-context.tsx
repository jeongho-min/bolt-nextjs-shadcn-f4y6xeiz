"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TreatmentCase {
  id: string;
  title: string;
  description: string;
  date: string;
  categoryId: string;
  treatment_categories: {
    name: string;
  };
}

interface TreatmentCaseContextType {
  cases: TreatmentCase[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const TreatmentCaseContext = createContext<TreatmentCaseContextType | undefined>(undefined);

export function TreatmentCaseProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = useState<TreatmentCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/treatment-cases");

      if (!response.ok) {
        throw new Error("Failed to fetch cases");
      }

      const data = await response.json();
      setCases(data);
    } catch (error) {
      setError("진료 사례를 불러오는데 실패했습니다.");
      toast({
        title: "에러",
        description: "진료 사례를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <TreatmentCaseContext.Provider
      value={{
        cases,
        isLoading,
        error,
        refetch: fetchCases,
      }}
    >
      {children}
    </TreatmentCaseContext.Provider>
  );
}

export function useTreatmentCases() {
  const context = useContext(TreatmentCaseContext);
  if (context === undefined) {
    throw new Error("useTreatmentCases must be used within a TreatmentCaseProvider");
  }
  return context;
}
