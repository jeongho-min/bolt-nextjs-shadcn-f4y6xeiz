"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { TreatmentCaseTable } from "./components/treatment-case-table";
import { TreatmentCaseDialog } from "./components/treatment-case-dialog";

interface TreatmentCase {
  id: string;
  title: string;
  description: string;
  date: string;
  is_active: boolean;
  order_num: number;
  treatment_categories: {
    id: string;
    name: string;
  };
}

export default function TreatmentCasesPage() {
  const [treatmentCases, setTreatmentCases] = useState<TreatmentCase[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<TreatmentCase | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    fetchTreatmentCases();
  }, []);

  const fetchTreatmentCases = async () => {
    try {
      const response = await fetch("/api/admin/treatment-cases");
      if (!response.ok) throw new Error("Failed to fetch treatment cases");
      const data = await response.json();
      setTreatmentCases(data);
    } catch (error) {
      toast({
        title: "에러",
        description: "치료 사례를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (treatmentCase: TreatmentCase) => {
    setSelectedCase(treatmentCase);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/treatment-cases/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete treatment case");

      toast({
        title: "성공",
        description: "치료 사례가 삭제되었습니다.",
      });

      fetchTreatmentCases();
    } catch (error) {
      toast({
        title: "에러",
        description: "치료 사례 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleAddCase = () => {
    setSelectedCase(undefined);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedCase(undefined);
    setDialogOpen(false);
  };

  return (
    <PageLayout
      title="치료 사례 관리"
      backUrl="/admin"
      actions={[
        {
          label: "새 치료 사례 추가",
          onClick: handleAddCase,
          variant: "default",
        },
      ]}
    >
      <TreatmentCaseTable treatmentCases={treatmentCases} onEdit={handleEdit} onDelete={handleDelete} />
      <TreatmentCaseDialog open={dialogOpen} onOpenChange={setDialogOpen} treatmentCase={selectedCase} onSuccess={fetchTreatmentCases} />
    </PageLayout>
  );
}
