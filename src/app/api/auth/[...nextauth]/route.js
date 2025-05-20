import { loginService, registerUserService } from "@/service/auth.service";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credential) {
        const userData = {
          email: credential?.email,
          password: credential?.password,
        };

        const response = await loginService(userData);
        if (response?.status === "INTERNAL_SERVER_ERROR") {
          throw new Error(response?.message);
        }

        return { token: response.payload.token };
      },
    }),
    // GoogleProvider({
    //   clientId: GOOGLE_CLIENT_ID,
    //   clientSecret: GOOGLE_CLIENT_SECRET,
    // }),
  ],

  pages: {
    signIn: "/login",
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt", // Adjust this based on your session strategy
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
