"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { HolidayForm } from "../components/holiday-form";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Holiday {
  id: string;
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

export default function EditHolidayPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const response = await fetch(`/api/admin/holidays/${params.id}`);
        if (!response.ok) throw new Error("휴일 정보를 불러오는데 실패했습니다.");
        const data = await response.json();

        // API 응답 데이터를 폼에 맞는 형식으로 변환
        const formattedData: Holiday = {
          id: data.id,
          title: data.title,
          description: data.description || undefined,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
          isActive: data.isActive,
        };

        setHoliday(formattedData);
      } catch (error) {
        toast({
          title: "오류",
          description: "휴일 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
        router.push("/admin/holidays");
      } finally {
        setLoading(false);
      }
    };

    fetchHoliday();
  }, [params.id, toast, router]);

  if (loading) {
    return (
      <PageLayout title="휴일 수정" backUrl="/admin/holidays">
        <div>로딩 중...</div>
      </PageLayout>
    );
  }

  if (!holiday) {
    return (
      <PageLayout title="휴일 수정" backUrl="/admin/holidays">
        <div>휴일을 찾을 수 없습니다.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="휴일 수정" backUrl="/admin/holidays">
      <div className="max-w-2xl">
        <HolidayForm mode="edit" initialData={holiday} />
      </div>
    </PageLayout>
  );
}
