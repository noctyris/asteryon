export const dynamic = 'force-dynamic';

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl">Asteryon</h1>
      <Link href="/upload">Upload</Link>
    </div>
  );
}
