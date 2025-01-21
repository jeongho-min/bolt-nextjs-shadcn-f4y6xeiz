"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Building2, Clock, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { HospitalForm } from "./components/hospital-form";

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

export default function HospitalInfoPage() {
  const [info, setInfo] = useState<HospitalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHospitalInfo();
  }, []);

  const fetchHospitalInfo = async () => {
    try {
      const response = await fetch("/api/admin/hospital");
      if (!response.ok) throw new Error("병원 정보를 불러오는데 실패했습니다.");
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "병원 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<HospitalInfo>) => {
    try {
      const response = await fetch("/api/admin/hospital", {
        method: info ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("병원 정보 저장에 실패했습니다.");

      toast({
        description: "병원 정보가 성공적으로 저장되었습니다.",
      });

      await fetchHospitalInfo();
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "오류",
        description: "병원 정보 저장 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="병원 정보 관리">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </Card>
      </PageLayout>
    );
  }

  if (isEditing) {
    return (
      <PageLayout
        title="병원 정보 수정"
        backUrl="/admin"
        actions={[
          {
            label: "취소",
            onClick: () => setIsEditing(false),
            variant: "outline",
          },
        ]}
      >
        <Card className="p-6">
          <HospitalForm initialData={info} onSubmit={handleSubmit} />
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="병원 정보 관리"
      backUrl="/admin"
      actions={[
        {
          label: "수정하기",
          onClick: () => setIsEditing(true),
        },
      ]}
    >
      <Card className="p-6 space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">기본 정보</h3>
          <div className="grid gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">병원명:</span>
              <span>{info?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">대표자:</span>
              <span>{info?.representative}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">사업자등록번호:</span>
              <span>{info?.businessNumber}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">위치 정보</h3>
          <div className="grid gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">주소:</span>
              <span>
                {info?.address} {info?.addressDetail}
              </span>
            </div>
            {info?.parkingInfo && (
              <div className="flex items-center gap-2">
                <span className="font-medium">주차:</span>
                <span>{info.parkingInfo}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">연락처</h3>
          <div className="grid gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">대표전화:</span>
              <span>{info?.mainPhone}</span>
            </div>
            {info?.specialtyPhone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">특수진료:</span>
                <span>{info.specialtyPhone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">진료 시간</h3>
          <div className="grid gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">평일:</span>
              <span>
                {info?.weekdayOpen} - {info?.weekdayClose}
              </span>
            </div>
            {info?.saturdayOpen && info?.saturdayClose && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">토요일:</span>
                <span>
                  {info.saturdayOpen} - {info.saturdayClose}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">점심시간:</span>
              <span>
                {info?.lunchStart} - {info?.lunchEnd}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">휴진:</span>
              <span>{info?.closedDays}</span>
            </div>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}
