import { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { Adapter } from "next-auth/adapters";

const customPrismaAdapter = Object.assign(PrismaAdapter(prisma), {
  getUser: async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return {
      ...user,
      role: user.role ?? "USER",
    };
  },
}) as Adapter;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: customPrismaAdapter,
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      authorization: {
        url: "https://nid.naver.com/oauth2.0/authorize",
        params: {
          response_type: "code",
          scope: "name email profile_image mobile",
        },
      },
      profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
          image: profile.response.profile_image,
          phone: profile.response.mobile,
          role: "USER" as const,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: {
        url: "https://kauth.kakao.com/oauth/authorize",
        params: {
          scope: "account_email",
        },
      },
      token: {
        url: "https://kauth.kakao.com/oauth/token",
      },
      userinfo: {
        url: "https://kapi.kakao.com/v2/user/me",
        request: async ({ tokens }) => {
          const response = await fetch("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          });

          if (!response.ok) {
            throw new Error(`Kakao API error: ${response.status}`);
          }

          return response.json();
        },
      },
      profile(profile) {
        if (!profile.id) {
          throw new Error("No profile ID");
        }
        return {
          id: profile.id.toString(),
          name: profile.properties?.nickname ?? null,
          email: profile.kakao_account?.email ?? null,
          image: profile.properties?.profile_image ?? null,
          phone: null,
          role: "USER" as const,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (!user.email || !account) {
          return false;
        }

        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              phone: account.provider === "naver" ? (user as any).phone : null,
              role: "USER",
            },
            include: {
              accounts: true,
            },
          });

          await prisma.account.create({
            data: {
              userId: dbUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token ?? null,
              refresh_token: account.refresh_token ?? null,
              expires_at: account.expires_at ?? null,
              token_type: account.token_type ?? null,
              scope: account.scope ?? null,
              id_token: account.id_token ?? null,
            },
          });
        } else if (!dbUser.accounts.some((acc) => acc.provider === account.provider)) {
          await prisma.account.create({
            data: {
              userId: dbUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token ?? null,
              refresh_token: account.refresh_token ?? null,
              expires_at: account.expires_at ?? null,
              token_type: account.token_type ?? null,
              scope: account.scope ?? null,
              id_token: account.id_token ?? null,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.email = dbUser.email;
          session.user.name = dbUser.name;
          session.user.image = dbUser.image;
          session.user.phone = dbUser.phone;
          session.user.role = dbUser.role;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 24 * 60 * 60, // 24시간
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
