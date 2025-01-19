"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { PageLayout } from "@/app/admin/components/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PriceCategory {
  id: string;
  name: string;
  order: number;
  parentId: string | null;
}

interface Props {
  params: {
    id: string;
  };
}

export default function EditPriceCategoryPage({ params }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [formData, setFormData] = useState<PriceCategory>({
    id: "",
    name: "",
    order: 0,
    parentId: null,
  });

  useEffect(() => {
    fetchCategories();
    fetchCategory();
  }, [params.id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/prices/categories");
      if (!response.ok) throw new Error("카테고리 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      setCategories(data.filter((category: PriceCategory) => category.id !== params.id));
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/admin/prices/categories/${params.id}`);
      if (!response.ok) throw new Error("카테고리 정보를 불러오는데 실패했습니다.");
      const data = await response.json();
      setFormData({
        id: data.id,
        name: data.name,
        order: data.order,
        parentId: data.parentId,
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestData = {
        ...formData,
        parentId: formData.parentId === "root" ? null : formData.parentId,
      };

      const response = await fetch(`/api/admin/prices/categories/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("카테고리 수정에 실패했습니다.");
      }

      toast({
        title: "성공",
        description: "카테고리가 수정되었습니다.",
      });

      router.push("/admin/prices");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "카테고리 수정에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="카테고리 수정" onBack={() => router.push("/admin/prices")}>
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle>카테고리 정보</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentId">상위 카테고리</Label>
                <Select value={formData.parentId || "root"} onValueChange={(value) => setFormData({ ...formData, parentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="상위 카테고리 선택 (선택사항)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">없음 (최상위 카테고리)</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">카테고리명</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="예: 한약/처방, 치료/처치, 제증명"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">정렬 순서</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  취소
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "수정 중..." : "수정"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
