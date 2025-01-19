"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLayout } from "@/app/admin/components/page-layout";
import { CategoryTab } from "./components/category-tab";
import { PriceTab } from "./components/price-tab";

export default function PricesPage() {
  const [activeTab, setActiveTab] = useState("items");
  const router = useRouter();

  return (
    <PageLayout title="가격표 관리" backUrl="/admin">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">카테고리</TabsTrigger>
          <TabsTrigger value="items">가격표 항목</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <CategoryTab />
        </TabsContent>
        <TabsContent value="items">
          <PriceTab />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
