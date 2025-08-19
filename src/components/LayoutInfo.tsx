"use client";

import { usePathname } from "next/navigation";
import { LogIn, LayoutDashboard, House } from "lucide-react";
import Link from "next/link";

export default function LayoutInfo({ className, isAuth }: { className?: string, isAuth: boolean }) {
  const pathname = usePathname();

  return (
    <header
      className={`${className} py-3 px-6 w-full flex flex-column justify-between items-center`}
    >
      <p className="text-5xl underline decoration-indigo-500 md:decoration-indigo-500/25 hover:decoration-indigo-500 text-shadow-md hover:text-shadow-lg text-shadow-indigo-500">
        Asteryon
      </p>
      {pathname==="/" && (
        <Link href={isAuth ? "/dashboard" : "/login"} className="hover:underline">
          {isAuth ? <LayoutDashboard /> : <LogIn />}
        </Link>
      )}
      {pathname!=="/" && (
        <Link className="hover:underline mr-4" href="/">
          <House />
        </Link>
      )}
    </header>
  );
}
