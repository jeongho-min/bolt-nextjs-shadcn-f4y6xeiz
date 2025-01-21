"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { CategoryTab } from "./components/category-tab";
import { PriceTab } from "./components/price-tab";

export default function PricesPage() {
  const [activeTab, setActiveTab] = useState("categories");

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
