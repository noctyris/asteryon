import { SessionProvider } from 'next-auth/react';
import { auth } from "@root/auth"

export default async function DashboardLayout({ children } : Readonly<{children: React.ReactNode;}>) {
  const session = await auth();
//  console.log("Session serveur:",session);

  return (
    <>
      <p>dashbaord</p>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  )
}
