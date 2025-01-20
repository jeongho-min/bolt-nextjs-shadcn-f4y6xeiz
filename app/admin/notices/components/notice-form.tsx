"use client";

import { useState } from "react";
import { Notice, NoticeCategory, NoticeAttachment } from "@prisma/client";
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
import { Editor } from "@/components/editor";
import { uploadImage } from "@/lib/supabase";

type FormAttachment = {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
};

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
  category: z.nativeEnum(NoticeCategory),
  isImportant: z.boolean(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  attachments: z
    .array(
      z.object({
        fileName: z.string(),
        fileUrl: z.string(),
        fileSize: z.number(),
        mimeType: z.string(),
      })
    )
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

interface NoticeWithAttachments extends Omit<Notice, "attachments"> {
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
  }[];
}

interface NoticeFormProps {
  initialData: NoticeWithAttachments | null;
  onSubmit: (data: Partial<NoticeWithAttachments>) => Promise<void>;
}

export function NoticeForm({ initialData, onSubmit }: NoticeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || "NOTICE",
      isImportant: initialData?.isImportant || false,
      startDate: initialData?.startDate ? format(new Date(initialData.startDate), "yyyy-MM-dd") : undefined,
      endDate: initialData?.endDate ? format(new Date(initialData.endDate), "yyyy-MM-dd") : undefined,
      attachments:
        initialData?.attachments?.map((attachment) => ({
          fileName: attachment.fileName,
          fileUrl: attachment.fileUrl,
          fileSize: attachment.fileSize,
          mimeType: attachment.mimeType,
        })) || [],
    },
  });

  const handleSubmit = async (values: FormData) => {
    try {
      setIsSubmitting(true);
      const { attachments, ...rest } = values;

      await onSubmit({
        ...rest,
        startDate: values.startDate ? new Date(values.startDate) : undefined,
        endDate: values.endDate ? new Date(values.endDate) : undefined,
        attachments: attachments as any,
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

  const handleFileUpload = async (fileUrl: string) => {
    try {
      const fileName = fileUrl.split("/").pop() || "첨부파일";
      const newAttachment: FormAttachment = {
        fileName,
        fileUrl,
        fileSize: 0, // 실제 파일 크기는 서버에서 처리
        mimeType: "application/octet-stream",
      };

      const currentAttachments = form.getValues("attachments") || [];
      form.setValue("attachments", [...currentAttachments, newAttachment]);
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };

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
                      <Editor value={field.value} onChange={field.onChange} placeholder="내용을 입력하세요" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="isImportant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">중요 공지</FormLabel>
                      <div className="text-sm text-muted-foreground">이 공지사항을 중요 공지로 표시합니다.</div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>첨부파일</FormLabel>
                <div className="space-y-4">
                  <ImageUpload onUploadComplete={handleFileUpload} accept="*/*" />
                  {form.watch("attachments")?.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {file.fileName}
                      </a>
                      <span className="text-sm text-gray-500">({Math.round(file.fileSize / 1024)}KB)</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const attachments = form.getValues("attachments") || [];
                          form.setValue(
                            "attachments",
                            attachments.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
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
