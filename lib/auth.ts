import { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
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
        if (!user.email) {
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
              phone: account?.provider === "naver" ? user.phone : null,
            },
            include: {
              accounts: true,
            },
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
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
          session.user.email = dbUser.email ?? undefined;
          session.user.name = dbUser.name ?? undefined;
          session.user.image = dbUser.image ?? undefined;
          session.user.phone = dbUser.phone ?? undefined;
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
