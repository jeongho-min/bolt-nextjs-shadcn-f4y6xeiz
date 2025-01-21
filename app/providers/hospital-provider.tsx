"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface HospitalInfo {
  id: string;
  name: string;
  representative: string;
  businessNumber: string;
  address: string;
  addressDetail?: string | null;
  parkingInfo?: string | null;
  mainPhone: string;
  specialtyPhone?: string | null;
  weekdayOpen: string;
  weekdayClose: string;
  saturdayOpen?: string | null;
  saturdayClose?: string | null;
  lunchStart: string;
  lunchEnd: string;
  closedDays: string;
}

interface HospitalContextType {
  hospitalInfo: HospitalInfo | null;
  isLoading: boolean;
  error: Error | null;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalProvider({ children }: { children: ReactNode }) {
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await fetch("/api/hospital");
        if (!response.ok) throw new Error("병원 정보를 불러오는데 실패했습니다.");
        const data = await response.json();
        console.log("🚀 ~ fetchHospitalInfo ~ data:", data);
        setHospitalInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitalInfo();
  }, []);

  return (
    <HospitalContext.Provider
      value={{
        hospitalInfo,
        isLoading,
        error,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error("useHospital must be used within a HospitalProvider");
  }
  return context;
}
