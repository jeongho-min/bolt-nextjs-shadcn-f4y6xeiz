import { BackButton, CreateButton, ViewToggleButtons } from "./buttons";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  onCreate?: () => void;
  createButtonLabel?: string;
  viewOptions?: {
    isDesktop: boolean;
    viewType: "table" | "grid";
    onViewChange: (view: "table" | "grid") => void;
  };
}

export function PageHeader({ title, onBack, onCreate, createButtonLabel, viewOptions }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <BackButton onClick={onBack} />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {viewOptions?.isDesktop && (
          <div className="mr-2">
            <ViewToggleButtons viewType={viewOptions.viewType} onViewChange={viewOptions.onViewChange} />
          </div>
        )}
        {onCreate && createButtonLabel && <CreateButton onClick={onCreate} label={createButtonLabel} />}
      </div>
    </div>
  );
}
