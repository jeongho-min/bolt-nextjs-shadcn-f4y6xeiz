import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function useHandleOAuthError() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const errorShown = sessionStorage.getItem("errorShown");

    if (error === "OAuthCallback" && !errorShown) {
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "소셜 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
      sessionStorage.setItem("errorShown", "true");
    }
  }, [searchParams, toast]);
}
