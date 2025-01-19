import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const priceFormSchema = z.object({
  name: z.string().min(1, "항목명을 입력해주세요"),
  description: z.string().optional(),
  specification: z.string().optional(),
  priceType: z.enum(["FIXED", "RANGE", "TEXT"], {
    required_error: "가격 유형을 선택해주세요",
  }),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  priceText: z.string().optional(),
  order: z.number().default(0),
  categoryId: z.string().min(1, "카테고리를 선택해주세요"),
});

export type PriceFormValues = z.infer<typeof priceFormSchema>;

interface PriceFormProps {
  initialData?: PriceFormValues & { id: string };
}

interface PriceCategory {
  id: string;
  name: string;
  level: number;
  children: PriceCategory[];
  parentId: string | null;
  order: number;
  items: {
    id: string;
    order: number;
  }[];
}

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

export function PriceForm({ initialData }: PriceFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<PriceCategory[]>([]);

  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      specification: "",
      priceType: "FIXED",
      priceMin: 0,
      priceMax: 0,
      priceText: "",
      categoryId: searchParams.get("categoryId") || "",
      order: 0,
    },
  });

  const priceType = form.watch("priceType");
  const selectedCategoryId = form.watch("categoryId");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId && !initialData) {
      const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);
      if (selectedCategory) {
        // 디버깅을 위한 로그 추가
        console.log("Selected category items:", selectedCategory.items);

        // 현재 카테고리의 모든 항목을 가져와서 가장 큰 order 값을 찾음
        const getAllItems = (category: PriceCategory): number => {
          const itemOrders = category.items.map((item) => item.order);
          const maxItemOrder = Math.max(...itemOrders, -1);

          // 재귀적으로 하위 카테고리의 항목들도 확인
          const childrenMaxOrders = category.children.map((child) => getAllItems(child));
          const maxChildOrder = Math.max(...childrenMaxOrders, -1);

          return Math.max(maxItemOrder, maxChildOrder);
        };

        const maxOrder = getAllItems(selectedCategory);
        console.log("Max order found:", maxOrder);

        // order 값을 설정하고 form을 강제로 업데이트
        const nextOrder = maxOrder + 1;
        form.setValue("order", nextOrder, { shouldValidate: true });

        // 디버깅을 위한 현재 폼 값 로그
        console.log("Current form values:", form.getValues());
      }
    }
  }, [selectedCategoryId, categories, form, initialData]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/prices/categories");
      if (!response.ok) throw new Error("카테고리 목록을 불러오는데 실패했습니다.");
      const data = await response.json();

      // 디버깅을 위한 API 응답 로그
      console.log("API Response:", data);

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

  async function onSubmit(data: PriceFormValues) {
    try {
      setIsLoading(true);

      const response = await fetch(initialData ? `/api/admin/prices/${initialData.id}` : `/api/admin/prices`, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save price item");

      toast({
        title: "성공",
        description: initialData ? "가격표 항목이 수정되었습니다." : "새 가격표 항목이 추가되었습니다.",
      });

      router.push("/admin/prices");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: "가격표 항목 저장에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{renderCategoryOptions(categories)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>항목명</FormLabel>
              <FormControl>
                <Input placeholder="일반 탕약" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>규격/용량</FormLabel>
              <FormControl>
                <Input placeholder="15일분" {...field} />
              </FormControl>
              <FormDescription>예: 15일분, 30환, 1매 등</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea placeholder="항목에 대한 추가 설명을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>가격 유형</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="가격 유형을 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FIXED">고정 가격</SelectItem>
                  <SelectItem value="RANGE">가격 범위</SelectItem>
                  <SelectItem value="TEXT">텍스트형 가격</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {priceType === "FIXED" && (
          <FormField
            control={form.control}
            name="priceMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가격</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="300000" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormDescription>원 단위로 입력하세요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {priceType === "RANGE" && (
          <>
            <FormField
              control={form.control}
              name="priceMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>최소 가격</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="250000" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>최대 가격</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="600000" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {priceType === "TEXT" && (
          <FormField
            control={form.control}
            name="priceText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가격 텍스트</FormLabel>
                <FormControl>
                  <Input placeholder="본인부담 30%" {...field} />
                </FormControl>
                <FormDescription>예: 본인부담 30%, 상담 후 결정 등</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>정렬 순서</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormDescription>낮은 숫자가 먼저 표시됩니다</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "저장 중..." : initialData ? "수정하기" : "추가하기"}
        </Button>
      </form>
    </Form>
  );
}
