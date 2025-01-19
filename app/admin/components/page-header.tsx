import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutGrid, Table } from "lucide-react";

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline";
}

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  actions?: ActionButton[];
  viewOptions?: {
    isDesktop: boolean;
    viewType: "table" | "grid";
    onViewChange: (view: "table" | "grid") => void;
  };
}

export function PageHeader({ title, onBack, actions, viewOptions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {viewOptions?.isDesktop && (
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewOptions.viewType === "table" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => viewOptions.onViewChange("table")}
              title="테이블 보기"
            >
              <Table className="w-4 h-4" />
            </Button>
            <Button
              variant={viewOptions.viewType === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => viewOptions.onViewChange("grid")}
              title="카드 보기"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        )}
        {actions?.map((action, index) => (
          <Button key={index} onClick={action.onClick} variant={action.variant}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
