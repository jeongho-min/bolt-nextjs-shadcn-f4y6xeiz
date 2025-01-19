import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, description, actions, children }: PageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}
