import { Loader } from "@/app/components/ui/loader";

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center h-[400px]">
          <Loader className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}
