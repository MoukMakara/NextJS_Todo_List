import { loginService } from "@/service/auth.service";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
  ],

  // Only the path here, no function!
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
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
