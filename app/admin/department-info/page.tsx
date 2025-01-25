"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { DepartmentInfoTable } from "./components/department-info-table";
import { DepartmentInfoDialog } from "./components/department-info-dialog";

interface DepartmentInfo {
  id: string;
  name: string;
  type: "KOREAN" | "WESTERN";
  icon: string;
  description: string;
  order_num: number;
  is_active: boolean;
}

export default function DepartmentInfoPage() {
  const [departments, setDepartments] = useState<DepartmentInfo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentInfo | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/admin/department-info");
      if (!response.ok) throw new Error("Failed to fetch departments");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      toast({
        title: "에러",
        description: "진료과목 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (department: DepartmentInfo) => {
    setSelectedDepartment(department);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/department-info/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete department");

      toast({
        title: "성공",
        description: "진료과목이 삭제되었습니다.",
      });

      fetchDepartments();
    } catch (error) {
      toast({
        title: "에러",
        description: "진료과목 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleAddDepartment = () => {
    setSelectedDepartment(undefined);
    setDialogOpen(true);
  };

  return (
    <PageLayout
      title="진료과목 정보 관리"
      backUrl="/admin"
      actions={[
        {
          label: "새 진료과목 추가",
          onClick: handleAddDepartment,
          variant: "default",
        },
      ]}
    >
      <DepartmentInfoTable departments={departments} onEdit={handleEdit} onDelete={handleDelete} />
      <DepartmentInfoDialog open={dialogOpen} onOpenChange={setDialogOpen} department={selectedDepartment} onSuccess={fetchDepartments} />
    </PageLayout>
  );
}
