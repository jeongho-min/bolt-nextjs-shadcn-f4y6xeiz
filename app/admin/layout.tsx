"use client";

import { ReactNode, useEffect } from "react";
import { useFooter } from "../providers/footer-provider";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { setIsFooterVisible } = useFooter();

  useEffect(() => {
    // Admin 페이지에서는 Footer를 숨김
    setIsFooterVisible(false);

    // 컴포넌트가 언마운트될 때 Footer를 다시 보이도록 설정
    return () => {
      setIsFooterVisible(true);
    };
  }, [setIsFooterVisible]);

  return <div className="min-h-screen bg-gray-50/50">{children}</div>;
}
