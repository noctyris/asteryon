'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LayoutInfo({ className }: { className?: string }) {
  const pathname = usePathname();

  const uploadBtnPages = ["/"];
  const crossBtnPages = ["/upload"]

  return (
    <header className={`${className} p-3 w-full flex flex-column justify-between items-center`}>
      <Link
        href="/"
        className="text-5xl underline decoration-indigo-500 md:decoration-indigo-500/25 hover:decoration-indigo-500 text-shadow-md hover:text-shadow-lg text-shadow-indigo-500"
      >
        Asteryon
      </Link>
      {uploadBtnPages.includes(pathname) && (
        <Link href="/upload" className="">
          Upload
        </Link>
      )}
      {(pathname.startsWith('/image') || crossBtnPages.includes(pathname)) && <p>✕</p>}
    </header>
  );
}

