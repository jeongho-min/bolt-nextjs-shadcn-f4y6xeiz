"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { HolidayForm } from "../components/holiday-form";

export default function NewHolidayPage() {
  return (
    <PageLayout title="새 휴일 등록" backUrl="/admin/holidays">
      <div className="max-w-2xl">
        <HolidayForm mode="create" />
      </div>
    </PageLayout>
  );
}
