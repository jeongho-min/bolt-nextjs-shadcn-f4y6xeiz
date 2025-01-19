import { ReactNode } from "react";
import { PageHeader } from "./page-header";

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline";
}

interface PageLayoutProps {
  title: string;
  onBack: () => void;
  actions?: ActionButton[];
  viewOptions?: {
    isDesktop: boolean;
    viewType: "table" | "grid";
    onViewChange: (view: "table" | "grid") => void;
  };
  headerContent?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, onBack, actions, viewOptions, headerContent, children }: PageLayoutProps) {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="space-y-4">
        <PageHeader title={title} onBack={onBack} actions={actions} viewOptions={viewOptions} />
        {headerContent}
      </div>
      {children}
    </div>
  );
}
