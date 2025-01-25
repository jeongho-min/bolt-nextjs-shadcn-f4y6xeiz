"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { TreatmentCategoryTable } from "./components/treatment-category-table";
import { TreatmentCategoryDialog } from "./components/treatment-category-dialog";

interface TreatmentCategory {
  id: string;
  name: string;
  description: string | null;
  order_num: number;
  is_active: boolean;
}

export default function TreatmentCategoriesPage() {
  const [categories, setCategories] = useState<TreatmentCategory[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TreatmentCategory | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/treatment-categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast({
        title: "에러",
        description: "카테고리 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: TreatmentCategory) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/treatment-categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      toast({
        title: "성공",
        description: "카테고리가 삭제되었습니다.",
      });

      fetchCategories();
    } catch (error) {
      toast({
        title: "에러",
        description: "카테고리 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleAddCategory = () => {
    setSelectedCategory(undefined);
    setDialogOpen(true);
  };

  return (
    <PageLayout
      title="치료 사례 카테고리 관리"
      backUrl="/admin"
      actions={[
        {
          label: "새 카테고리 추가",
          onClick: handleAddCategory,
          variant: "default",
        },
      ]}
    >
      <TreatmentCategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
      <TreatmentCategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} category={selectedCategory} onSuccess={fetchCategories} />
    </PageLayout>
  );
}
