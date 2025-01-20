import { BrandLoader } from "@/components/ui/brand-loader";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <BrandLoader variant="default" />
    </div>
  );
}
