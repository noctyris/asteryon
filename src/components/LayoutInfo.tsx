"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LayoutInfo({ className }: { className?: string }) {
  const pathname = usePathname();

  const uploadBtnPages = ["/"];
  const crossBtnPages = ["/dashboard/upload"];

  return (
    <header
      className={`${className} py-3 px-6 w-full flex flex-column justify-between items-center`}
    >
      <p className="text-5xl underline decoration-indigo-500 md:decoration-indigo-500/25 hover:decoration-indigo-500 text-shadow-md hover:text-shadow-lg text-shadow-indigo-500">
        Asteryon
      </p>
      {uploadBtnPages.includes(pathname) && (
        <Link href="/dashboard/upload" className="hover:underline">
          Upload
        </Link>
      )}
      {(pathname.startsWith("/image") || crossBtnPages.includes(pathname)) && (
        <Link className="hover:underline mr-4" href="/">
          ✕
        </Link>
      )}
    </header>
  );
}
