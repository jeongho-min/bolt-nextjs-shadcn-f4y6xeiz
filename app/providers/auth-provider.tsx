"use client";

import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { createContext, useContext } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { UserRole } from "@prisma/client";

interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string | null;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signOut: async () => {},
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const value = {
    user: session?.user ?? null,
    isAuthenticated: !!session?.user,
    signOut: () => nextAuthSignOut({ callbackUrl: "/" }),
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
