"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface DepartmentInfo {
  id: string;
  name: string;
  type: "KOREAN" | "WESTERN";
  icon: string;
  description: string;
  order_num: number;
  is_active: boolean;
}

interface DepartmentInfoContextType {
  departments: DepartmentInfo[];
  isLoading: boolean;
  error: string | null;
}

const DepartmentInfoContext = createContext<DepartmentInfoContextType>({
  departments: [],
  isLoading: false,
  error: null,
});

export function DepartmentInfoProvider({ children }: { children: React.ReactNode }) {
  const [departments, setDepartments] = useState<DepartmentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch("/api/department-info");
        if (!response.ok) {
          throw new Error("진료과목 정보를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDepartments();
  }, []);

  return <DepartmentInfoContext.Provider value={{ departments, isLoading, error }}>{children}</DepartmentInfoContext.Provider>;
}

export function useDepartmentInfo() {
  const context = useContext(DepartmentInfoContext);
  if (context === undefined) {
    throw new Error("useDepartmentInfo must be used within a DepartmentInfoProvider");
  }
  return context;
}
