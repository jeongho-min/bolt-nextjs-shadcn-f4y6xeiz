"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { HolidayForm } from "../components/holiday-form";

export default function NewHolidayPage() {
  return (
    <PageLayout title="새 휴일 등록" backUrl="/admin/holidays">
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-2xl">
          <HolidayForm mode="create" />
        </div>
      </div>
    </PageLayout>
  );
}
