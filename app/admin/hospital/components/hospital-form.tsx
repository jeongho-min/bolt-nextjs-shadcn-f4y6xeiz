"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { TimePicker } from "@/components/ui/time-picker";

const formSchema = z.object({
  name: z.string().min(1, "병원명을 입력해주세요."),
  representative: z.string().min(1, "대표자명을 입력해주세요."),
  businessNumber: z.string().min(1, "사업자등록번호를 입력해주세요."),
  address: z.string().min(1, "주소를 입력해주세요."),
  addressDetail: z.string().optional(),
  parkingInfo: z.string().optional(),
  mainPhone: z.string().min(1, "대표 전화번호를 입력해주세요."),
  specialtyPhone: z.string().optional(),
  weekdayOpen: z.string().min(1, "평일 시작 시간을 입력해주세요."),
  weekdayClose: z.string().min(1, "평일 종료 시간을 입력해주세요."),
  saturdayOpen: z.string().optional(),
  saturdayClose: z.string().optional(),
  lunchStart: z.string().min(1, "점심시간 시작을 입력해주세요."),
  lunchEnd: z.string().min(1, "점심시간 종료를 입력해주세요."),
  closedDays: z.string().min(1, "휴진일을 입력해주세요."),
});

interface HospitalFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
}

export function HospitalForm({ initialData, onSubmit }: HospitalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      representative: initialData?.representative || "",
      businessNumber: initialData?.businessNumber || "",
      address: initialData?.address || "",
      addressDetail: initialData?.addressDetail || "",
      parkingInfo: initialData?.parkingInfo || "",
      mainPhone: initialData?.mainPhone || "",
      specialtyPhone: initialData?.specialtyPhone || "",
      weekdayOpen: initialData?.weekdayOpen || "",
      weekdayClose: initialData?.weekdayClose || "",
      saturdayOpen: initialData?.saturdayOpen || "",
      saturdayClose: initialData?.saturdayClose || "",
      lunchStart: initialData?.lunchStart || "",
      lunchEnd: initialData?.lunchEnd || "",
      closedDays: initialData?.closedDays || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>병원명</FormLabel>
                  <FormControl>
                    <Input placeholder="병원명을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="representative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>대표자명</FormLabel>
                  <FormControl>
                    <Input placeholder="대표자명을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="businessNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자등록번호</FormLabel>
                <FormControl>
                  <Input placeholder="사업자등록번호를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>주소</FormLabel>
                  <FormControl>
                    <Input placeholder="주소를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressDetail"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>상세주소</FormLabel>
                  <FormControl>
                    <Input placeholder="상세주소를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="parkingInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>주차 정보</FormLabel>
                <FormControl>
                  <Input placeholder="주차 정보를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="mainPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>대표 전화번호</FormLabel>
                  <FormControl>
                    <Input placeholder="대표 전화번호를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialtyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>특수 진료 전화번호</FormLabel>
                  <FormControl>
                    <Input placeholder="특수 진료 전화번호를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="weekdayOpen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>평일 시작 시간</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weekdayClose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>평일 종료 시간</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="saturdayOpen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>토요일 시작 시간</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saturdayClose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>토요일 종료 시간</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lunchStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>점심시간 시작</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lunchEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>점심시간 종료</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="closedDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>휴진일</FormLabel>
                <FormControl>
                  <Input placeholder="휴진일을 입력하세요 (예: 일요일/공휴일)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            저장하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
