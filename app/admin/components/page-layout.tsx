"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { PageHeader } from "./page-header";

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline";
}

interface PageLayoutProps {
  title: string;
  backUrl?: string;
  actions?: ActionButton[];
  viewOptions?: {
    isDesktop: boolean;
    viewType: "table" | "grid";
    onViewChange: (view: "table" | "grid") => void;
  };
  headerContent?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, backUrl, actions, viewOptions, headerContent, children }: PageLayoutProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="space-y-4">
        <PageHeader title={title} onBack={backUrl ? () => router.push(backUrl) : undefined} actions={actions} viewOptions={viewOptions} />
        {headerContent}
      </div>
      {children}
    </div>
  );
}
