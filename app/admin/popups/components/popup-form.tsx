"use client";

import { useState } from "react";
import { PopupNotice, NoticeCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2 } from "lucide-react";
import { TipTapEditor } from "@/components/editor/tiptap-editor";

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
  category: z.nativeEnum(NoticeCategory),
  imageUrl: z.string().optional(),
  startDate: z.string().min(1, "게시 시작일을 선택해주세요."),
  endDate: z.string().min(1, "게시 종료일을 선택해주세요."),
  isActive: z.boolean(),
  priority: z.number().min(0).max(100),
  width: z.number().min(200).max(1000),
  height: z.number().optional(),
  position: z
    .object({
      top: z.string().optional(),
      left: z.string().optional(),
      right: z.string().optional(),
      bottom: z.string().optional(),
    })
    .optional(),
});

interface PopupFormProps {
  initialData: PopupNotice | null;
  onSubmit: (data: Partial<PopupNotice>) => Promise<void>;
}

export function PopupForm({ initialData, onSubmit }: PopupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || "NOTICE",
      imageUrl: initialData?.imageUrl || undefined,
      startDate: initialData?.startDate ? format(new Date(initialData.startDate), "yyyy-MM-dd") : "",
      endDate: initialData?.endDate ? format(new Date(initialData.endDate), "yyyy-MM-dd") : "",
      isActive: initialData?.isActive ?? true,
      priority: initialData?.priority || 0,
      width: initialData?.width || 320,
      height: initialData?.height ?? undefined,
      position: (initialData?.position as any) || { top: "10%", left: "10%" },
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await onSubmit({
        ...values,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    { label: "공지", value: "NOTICE" },
    { label: "안내", value: "INFO" },
    { label: "이벤트", value: "EVENT" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>카테고리</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="제목을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <TipTapEditor
                        content={field.value}
                        onChange={field.onChange}
                        placeholder="내용을 입력하세요"
                        onImageUpload={async (file) => {
                          // 이미지 업로드 기능이 필요한 경우 구현
                          return "";
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>팝업 이미지</FormLabel>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload onUploadComplete={field.onChange} defaultImage={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>게시 시작일</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>게시 종료일</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>우선순위</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} max={100} {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>너비 (px)</FormLabel>
                      <FormControl>
                        <Input type="number" min={200} max={1000} {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>높이 (px)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={200}
                          placeholder="자동"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">활성화</FormLabel>
                      <div className="text-sm text-muted-foreground">이 팝업을 활성화하여 사용자에게 표시합니다.</div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "수정하기" : "등록하기"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
