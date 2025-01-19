"use client";

import { useEffect, useState } from "react";
import { Doctor, Department } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { DoctorTable } from "./components/doctor-table";
import { DoctorCards } from "./components/doctor-cards";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PageLayout } from "../components/page-layout";

type DoctorWithDepartment = Doctor & {
  department: Department;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorWithDepartment[]>([]);
  const [viewType, setViewType] = useState<"table" | "grid">("table");
  const router = useRouter();
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    setViewType(isDesktop ? "table" : "grid");
  }, [isDesktop]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/admin/doctors");
      if (!response.ok) throw new Error("의사 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "의사 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (id: string) => {
    try {
      const doctor = doctors.find((d) => d.id === id);
      if (!doctor) return;

      const response = await fetch(`/api/admin/doctors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !doctor.isActive }),
      });

      if (!response.ok) throw new Error("상태 변경에 실패했습니다.");

      await fetchDoctors();
      toast({
        title: "상태 변경 성공",
        description: "의사 상태가 성공적으로 변경되었습니다.",
      });
    } catch (error) {
      toast({
        title: "상태 변경 실패",
        description: "의사 상태 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/doctors/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        await fetchDoctors();
        toast({
          title: "의사 삭제 성공",
          description: "의사가 성공적으로 삭제되었습니다.",
        });
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      toast({
        title: "의사 삭제 실패",
        description: error instanceof Error ? error.message : "의사 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout
      title="의사 관리"
      onBack={() => router.push("/admin")}
      actions={[
        {
          label: "새 의사 추가",
          onClick: () => router.push("/admin/doctors/new"),
        },
      ]}
      viewOptions={{
        isDesktop,
        viewType,
        onViewChange: setViewType,
      }}
    >
      {viewType === "table" && isDesktop ? (
        <DoctorTable doctors={doctors} onStatusToggle={handleStatusToggle} onDelete={handleDelete} />
      ) : (
        <DoctorCards doctors={doctors} onStatusToggle={handleStatusToggle} onDelete={handleDelete} />
      )}
    </PageLayout>
  );
}
