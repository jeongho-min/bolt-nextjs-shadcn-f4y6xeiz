"use client";

import { useRouter } from "next/navigation";
import { Department, MedicalSubject } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { DepartmentTable } from "./components/department-table";
import { DepartmentCards } from "./components/department-cards";
import { PageLayout } from "../components/page-layout";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SubjectDialog } from "./components/subject-dialog";
import { SubjectProvider } from "@/contexts/subject-context";

interface DepartmentWithSubjects extends Department {
  subjects: MedicalSubject[];
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentWithSubjects[]>([]);
  const [viewType, setViewType] = useState<"table" | "grid">("table");
  const [showSubjectDialog, setShowSubjectDialog] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
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
      const response = await fetch("/api/admin/departments?include=subjects");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      toast({
        title: "오류",
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
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("상태 변경에 실패했습니다.");
      }

      const updatedDepartment = await response.json();

      setDepartments((prev) => prev.map((dept) => (dept.id === id ? { ...updatedDepartment, subjects: dept.subjects } : dept)));

      toast({
        title: "성공",
        description: `부서가 ${!currentStatus ? "표시" : "숨김"} 상태로 변경되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "상태 변경 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/departments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      setDepartments((prev) => prev.filter((dept) => dept.id !== id));

      toast({
        title: "성공",
        description: "부서가 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "부서 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleAddSubjects = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setShowSubjectDialog(true);
  };

  const handleCloseSubjectDialog = () => {
    setShowSubjectDialog(false);
    setSelectedDepartmentId(null);
    // 진료과목이 추가된 후 부서 목록을 새로고침
    fetchDepartments();
  };

  return (
    <SubjectProvider>
      <PageLayout
        title="부서 관리"
        backUrl="/admin"
        actions={[
          {
            label: "부서 등록",
            onClick: () => router.push("/admin/departments/new"),
          },
        ]}
        viewOptions={{
          isDesktop,
          viewType,
          onViewChange: setViewType,
        }}
      >
        {viewType === "table" && isDesktop ? (
          <DepartmentTable
            departments={departments}
            onEdit={(id) => router.push(`/admin/departments/${id}`)}
            onDelete={handleDelete}
            onStatusToggle={handleStatusToggle}
            onAddSubjects={handleAddSubjects}
          />
        ) : (
          <DepartmentCards
            departments={departments}
            onEdit={(id) => router.push(`/admin/departments/${id}`)}
            onDelete={handleDelete}
            onStatusToggle={handleStatusToggle}
            onAddSubjects={handleAddSubjects}
          />
        )}
      </PageLayout>

      {showSubjectDialog && selectedDepartmentId && (
        <SubjectDialog isOpen={showSubjectDialog} onClose={handleCloseSubjectDialog} departmentId={selectedDepartmentId} />
      )}
    </SubjectProvider>
  );
}
