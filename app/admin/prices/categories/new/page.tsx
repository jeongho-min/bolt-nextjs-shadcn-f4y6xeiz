"use client";

import { useState, useEffect } from "react";
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
  level: number;
  children: PriceCategory[];
  parentId: string | null;
  order: number;
}

export default function NewPriceCategoryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    order: 0,
    parentId: "root",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const buildHierarchy = (categories: PriceCategory[]) => {
    const categoryMap = new Map();
    const rootCategories: PriceCategory[] = [];

    // 먼저 모든 카테고리를 맵에 저장
    categories.forEach((category) => {
      categoryMap.set(category.id, {
        ...category,
        children: [],
        level: 0,
      });
    });

    // 부모-자식 관계 설정
    categories.forEach((category) => {
      const node = categoryMap.get(category.id);
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          node.level = parent.level + 1;
          parent.children.push(node);
        }
      } else {
        rootCategories.push(node);
      }
    });

    // 정렬
    const sortCategories = (cats: PriceCategory[]) => {
      cats.sort((a, b) => a.order - b.order);
      cats.forEach((cat) => {
        if (cat.children.length > 0) {
          sortCategories(cat.children);
        }
      });
      return cats;
    };

    return sortCategories(rootCategories);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/prices/categories");
      if (!response.ok) throw new Error("카테고리 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      const hierarchicalCategories = buildHierarchy(data);
      setCategories(hierarchicalCategories);
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const renderCategoryOptions = (categories: PriceCategory[], level = 0): JSX.Element[] => {
    return categories.flatMap((category) => [
      <SelectItem key={category.id} value={category.id}>
        {"\u00A0".repeat(level * 4)}
        {level > 0 ? "└ " : ""}
        {category.name}
      </SelectItem>,
      ...renderCategoryOptions(category.children || [], level + 1),
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestData = {
        ...formData,
        parentId: formData.parentId === "root" ? null : formData.parentId,
      };

      const response = await fetch("/api/admin/prices/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("카테고리 생성에 실패했습니다.");
      }

      toast({
        title: "성공",
        description: "새로운 카테고리가 생성되었습니다.",
      });

      router.push("/admin/prices");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "카테고리 생성에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="새 카테고리 추가" backUrl="/admin/prices">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle>카테고리 정보</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentId">상위 카테고리</Label>
                <Select value={formData.parentId} onValueChange={(value) => setFormData({ ...formData, parentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="상위 카테고리 선택 (선택사항)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">없음 (최상위 카테고리)</SelectItem>
                    {renderCategoryOptions(categories)}
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
                  {isSubmitting ? "생성 중..." : "생성"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
