import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },
    session({ session, token, user }: any) {
      session.user = token.data as any;

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //Search the email
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        //Check the password
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Return the user object without the password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
