"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Edit, Trash2, FolderPlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PriceItem {
  id: string;
  name: string;
  description: string | null;
  specification: string | null;
  priceType: "FIXED" | "RANGE" | "TEXT";
  priceMin: number | null;
  priceMax: number | null;
  priceText: string | null;
  order: number;
}

interface PriceCategory {
  id: string;
  name: string;
  level: number;
  children: PriceCategory[];
  parentId: string | null;
  order: number;
  items: PriceItem[];
}

export function CategoryTab() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prices/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("가격표 항목 삭제에 실패했습니다.");

      await fetchCategories();
      toast({
        title: "성공",
        description: "가격표 항목이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "가격표 항목 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prices/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("카테고리 삭제에 실패했습니다.");

      await fetchCategories();
      toast({
        title: "성공",
        description: "카테고리가 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "카테고리 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const buildHierarchy = (categories: PriceCategory[]) => {
    const categoryMap = new Map();
    const rootCategories: PriceCategory[] = [];

    categories.forEach((category) => {
      categoryMap.set(category.id, {
        ...category,
        children: [],
        level: 0,
      });
    });

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

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const formatPrice = (item: any) => {
    if (!item.priceType) return "-";

    switch (item.priceType) {
      case "TEXT":
        return item.priceText || "-";
      case "RANGE":
        if (item.priceMin && item.priceMax) {
          return `${item.priceMin.toLocaleString()}원~${item.priceMax.toLocaleString()}원`;
        }
        return "-";
      case "FIXED":
        return item.priceMin ? `${item.priceMin.toLocaleString()}원` : "-";
      default:
        return "-";
    }
  };

  const renderCategoryCard = (category: PriceCategory) => {
    const hasChildren = category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);

    return (
      <div key={category.id} className="space-y-4">
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {(hasChildren || category.items.length > 0) && (
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => toggleExpand(category.id)}>
                  <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </Button>
              )}
              {category.level > 0 && <span className="text-muted-foreground mr-2">{"└".repeat(category.level)}</span>}
              {category.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/categories/new?parentId=${category.id}`)}>
                      <FolderPlus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>하위 카테고리 추가</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/new?categoryId=${category.id}`)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>가격표 항목 추가</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/categories/${category.id}`)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>카테고리 수정</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            이 카테고리를 삭제하시겠습니까?
                            {hasChildren && " 하위 카테고리와 "}
                            {category.items.length > 0 && " 포함된 가격표 항목도 "}
                            모두 삭제됩니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteCategory(category.id)} className="bg-red-500 hover:bg-red-600">
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>카테고리 삭제</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              항목 수: {category.items.length}개{hasChildren && `, 하위 카테고리: ${category.children.length}개`}
            </div>
          </CardContent>
        </Card>
        {isExpanded && (
          <div className="pl-4 space-y-4">
            {category.items.length > 0 && (
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                    <div>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      {item.specification && <p className="text-sm text-muted-foreground">{item.specification}</p>}
                      <p className="text-sm font-medium text-primary">{formatPrice(item)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/prices/${item.id}`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>가격 항목 삭제</AlertDialogTitle>
                            <AlertDialogDescription>정말로 이 가격 항목을 삭제하시겠습니까?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>삭제</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hasChildren && category.children.map(renderCategoryCard)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">카테고리 목록</h2>
        <Button onClick={() => router.push("/admin/prices/categories/new")}>새 카테고리</Button>
      </div>
      <div className="space-y-4">{categories.map(renderCategoryCard)}</div>
    </div>
  );
}
