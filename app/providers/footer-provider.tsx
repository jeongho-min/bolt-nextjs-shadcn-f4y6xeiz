"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface FooterContextType {
  isFooterVisible: boolean;
  setIsFooterVisible: (visible: boolean) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export function FooterProvider({ children }: { children: ReactNode }) {
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  return <FooterContext.Provider value={{ isFooterVisible, setIsFooterVisible }}>{children}</FooterContext.Provider>;
}

export function useFooter() {
  const context = useContext(FooterContext);
  if (context === undefined) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
}
