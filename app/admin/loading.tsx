import { BrandLoader } from "@/app/components/ui/brand-loader";

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center h-[400px]">
          <BrandLoader variant="default" />
        </div>
      </div>
    </div>
  );
}
