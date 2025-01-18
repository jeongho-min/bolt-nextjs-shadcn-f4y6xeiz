import { ReactNode } from "react";
import { PageHeader } from "./page-header";

interface PageLayoutProps {
  title: string;
  onBack: () => void;
  onCreate?: () => void;
  createButtonLabel?: string;
  viewOptions?: {
    isDesktop: boolean;
    viewType: "table" | "grid";
    onViewChange: (view: "table" | "grid") => void;
  };
  headerContent?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, onBack, onCreate, createButtonLabel, viewOptions, headerContent, children }: PageLayoutProps) {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="space-y-4">
        <PageHeader title={title} onBack={onBack} onCreate={onCreate} createButtonLabel={createButtonLabel} viewOptions={viewOptions} />
        {headerContent}
      </div>
      {children}
    </div>
  );
}
