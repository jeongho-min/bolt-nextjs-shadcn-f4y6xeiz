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
  categoryId: string;
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

  // 모든 카테고리 ID를 수집하는 함수
  const getAllCategoryIds = (categories: PriceCategory[]): Set<string> => {
    const ids = new Set<string>();
    const addIds = (cats: PriceCategory[]) => {
      cats.forEach((category) => {
        ids.add(category.id);
        if (category.children.length > 0) {
          addIds(category.children);
        }
      });
    };
    addIds(categories);
    return ids;
  };

  // 전체 펼치기
  const expandAll = () => {
    setExpandedCategories(getAllCategoryIds(categories));
  };

  // 전체 접기
  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prices/items/${id}`, {
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

  const handleMoveItemUp = async (itemId: string, items: PriceItem[]) => {
    const sortedItems = [...items].sort((a, b) => a.order - b.order);
    const currentIndex = sortedItems.findIndex((item) => item.id === itemId);

    if (currentIndex === 0) return;

    const currentItem = sortedItems[currentIndex];
    const targetItem = sortedItems[currentIndex - 1];

    try {
      // 현재 항목을 이전 항목의 순서로 변경
      const response1 = await fetch(`/api/admin/prices/items/${currentItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentItem,
          order: targetItem.order,
        }),
      });

      if (!response1.ok) throw new Error("순서 변경에 실패했습니다.");

      // 이전 항목을 현재 항목의 순서로 변경
      const response2 = await fetch(`/api/admin/prices/items/${targetItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...targetItem,
          order: currentItem.order,
        }),
      });

      if (!response2.ok) throw new Error("순서 변경에 실패했습니다.");

      await fetchCategories();
      toast({
        title: "성공",
        description: "순서가 변경되었습니다.",
      });
    } catch (error) {
      console.error("Error moving item up:", error);
      toast({
        title: "오류",
        description: "순서 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleMoveItemDown = async (itemId: string, items: PriceItem[]) => {
    const sortedItems = [...items].sort((a, b) => a.order - b.order);
    const currentIndex = sortedItems.findIndex((item) => item.id === itemId);

    if (currentIndex === sortedItems.length - 1) return;

    const currentItem = sortedItems[currentIndex];
    const targetItem = sortedItems[currentIndex + 1];

    try {
      // 현재 항목을 임시 순서로 변경 (다음 항목의 순서보다 조금 더 큰 값)
      const tempOrder = targetItem.order + 1;
      const response1 = await fetch(`/api/admin/prices/items/${currentItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentItem,
          order: tempOrder,
        }),
      });

      if (!response1.ok) throw new Error("순서 변경에 실패했습니다.");

      // 다음 항목을 현재 항목의 원래 순서로 변경
      const response2 = await fetch(`/api/admin/prices/items/${targetItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...targetItem,
          order: currentItem.order,
        }),
      });

      if (!response2.ok) throw new Error("순서 변경에 실패했습니다.");

      // 현재 항목을 다음 항목의 원래 순서로 변경
      const response3 = await fetch(`/api/admin/prices/items/${currentItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentItem,
          order: targetItem.order,
        }),
      });

      if (!response3.ok) throw new Error("순서 변경에 실패했습니다.");

      // 약간의 지연 후 목록 새로고침
      await new Promise((resolve) => setTimeout(resolve, 100));
      await fetchCategories();

      toast({
        title: "성공",
        description: "순서가 변경되었습니다.",
      });
    } catch (error) {
      console.error("Error moving item down:", error);
      toast({
        title: "오류",
        description: "순서 변경에 실패했습니다.",
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

      // 모든 카테고리 ID를 expandedCategories에 추가
      const allCategoryIds = getAllCategoryIds(hierarchicalCategories);
      setExpandedCategories(allCategoryIds);
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

    const sortedItems = [...category.items].sort((a, b) => a.order - b.order);

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

                <AlertDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>카테고리 삭제</p>
                    </TooltipContent>
                  </Tooltip>
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
                {sortedItems.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                    <div>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      {item.specification && <p className="text-sm text-muted-foreground">{item.specification}</p>}
                      <p className="text-sm font-medium text-primary">{formatPrice(item)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleMoveItemUp(item.id, category.items)}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleMoveItemDown(item.id, category.items)}
                          disabled={index === sortedItems.length - 1}
                        >
                          ↓
                        </Button>
                      </div>
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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            전체 펼치기
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            전체 접기
          </Button>
          <Button onClick={() => router.push("/admin/prices/categories/new")}>새 카테고리</Button>
        </div>
      </div>
      <div className="space-y-4">{categories.map(renderCategoryCard)}</div>
    </div>
  );
}
