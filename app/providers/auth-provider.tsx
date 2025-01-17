"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface AuthContextType {
  user: Session["user"] | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const value = {
    user: session?.user ?? null,
    accessToken: session?.accessToken ?? null,
    refreshToken: session?.refreshToken ?? null,
    isAuthenticated: !!session?.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}
