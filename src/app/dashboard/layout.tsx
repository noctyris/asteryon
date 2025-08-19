import { SessionProvider } from 'next-auth/react';
import Link from "next/link";
import { auth } from "@root/auth"

export default async function DashboardLayout({ children } : Readonly<{children: React.ReactNode;}>) {
  const session = await auth();

  return (
    <div className="p-2">
      <header className="w-full flex p-2 gap-2">
        <Link href="/dashboard/upload" className="hover:underline">Nouveau</Link>
      </header>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  )
}
