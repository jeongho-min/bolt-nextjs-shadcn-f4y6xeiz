"use client";

import { useEffect, useState } from "react";
import { Department } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { DepartmentTable } from "./components/department-table";
import { DepartmentCards } from "./components/department-cards";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PageLayout } from "../components/page-layout";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [viewType, setViewType] = useState<"table" | "grid">("table");
  const router = useRouter();
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setViewType(isDesktop ? "table" : "grid");
  }, [isDesktop]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/admin/departments");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      toast({
        title: "부서 정보 로딩 실패",
        description: "부서 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/departments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchDepartments();
        toast({
          title: "상태 변경 성공",
          description: "부서 상태가 성공적으로 변경되었습니다.",
        });
      }
    } catch (error) {
      toast({
        title: "상태 변경 실패",
        description: "부서 상태 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/departments/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        fetchDepartments();
        toast({
          title: "부서 삭제 성공",
          description: "부서가 성공적으로 삭제되었습니다.",
        });
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      toast({
        title: "부서 삭제 실패",
        description: error instanceof Error ? error.message : "부서 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout
      title="부서 관리"
      onBack={() => router.push("/admin")}
      onCreate={() => router.push("/admin/departments/new")}
      createButtonLabel="새 부서 추가"
      viewOptions={{
        isDesktop,
        viewType,
        onViewChange: setViewType,
      }}
    >
      {viewType === "table" && isDesktop ? (
        <DepartmentTable
          departments={departments}
          onStatusToggle={handleStatusToggle}
          onEdit={(id) => router.push(`/admin/departments/${id}`)}
          onDelete={handleDelete}
        />
      ) : (
        <DepartmentCards
          departments={departments}
          onStatusToggle={handleStatusToggle}
          onEdit={(id) => router.push(`/admin/departments/${id}`)}
          onDelete={handleDelete}
        />
      )}
    </PageLayout>
  );
}
