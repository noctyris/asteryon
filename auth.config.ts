import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import sql from '@/app/lib/data';
import bcrypt from 'bcrypt';
import { z } from 'zod';

async function getUser(email: string) {
  const user = await sql`SELECT * FROM users WHERE username=${email}`;
  return user[0];
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
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
} satisfies NextAuthConfig;

