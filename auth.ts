// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import sql from "@/app/lib/data";
import bcrypt from "bcrypt";
import { z } from "zod";

async function getUser(email: string) {
  const user = await sql`SELECT * FROM users WHERE username=${email}`;
  return user[0];
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = (user as { username: string }).username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as { id: string; name?: string; email?: string };
      session.user.id = t.id;
      session.user.name = t.name ?? "";
      session.user.email = t.email ?? "";
      return session;
    },
  },
});
