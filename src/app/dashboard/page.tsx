// src/app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
//  console.log("Session client:", session, status);

  if (status === 'loading') return <p>Chargement...</p>;
  if (!session) return <p>Pas connecté</p>;

  return (
    <div>
      <h1>Session</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

