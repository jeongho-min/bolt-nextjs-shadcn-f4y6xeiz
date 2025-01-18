import { ArrowLeft, Plus, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleButtonsProps {
  viewType: "table" | "grid";
  onViewChange: (view: "table" | "grid") => void;
}

interface CreateButtonProps {
  onClick: () => void;
  label: string;
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" size="icon" onClick={onClick} className="h-10 w-10">
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}

export function ViewToggleButtons({ viewType, onViewChange }: ViewToggleButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant={viewType === "table" ? "default" : "outline"} size="icon" onClick={() => onViewChange("table")} className="h-10 w-10">
        <TableIcon className="h-5 w-5" />
      </Button>
      <Button variant={viewType === "grid" ? "default" : "outline"} size="icon" onClick={() => onViewChange("grid")} className="h-10 w-10">
        <LayoutGrid className="h-5 w-5" />
      </Button>
    </div>
  );
}

export function CreateButton({ onClick, label }: CreateButtonProps) {
  return (
    <Button size="sm" onClick={onClick}>
      <Plus className="mr-2 h-5 w-5" />
      {label}
    </Button>
  );
}

export function StatusButton({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <Button size="sm" variant={isActive ? "default" : "secondary"} onClick={onClick} className="w-20">
      {isActive ? "활성" : "비활성"}
    </Button>
  );
}
