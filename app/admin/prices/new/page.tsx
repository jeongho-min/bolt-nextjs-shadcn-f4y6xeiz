"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceForm } from "../components/price-form";

export default function NewPricePage() {
  return (
    <PageLayout title="새 가격표 항목 추가" backUrl="/admin/prices">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle>가격표 항목 정보</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <PriceForm />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
