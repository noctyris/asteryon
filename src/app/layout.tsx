import type { Metadata } from "next";
import { Montserrat_Alternates, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: "500",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Asteryon",
  description: "Galerie d'astro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.className} ${montserratAlternates.variable} antialiased pt-2`}
      >
        <Link href="/" className={`${montserratAlternates.className} text-5xl p-3 underline decoration-indigo-500 md:decoration-indigo-500/25 hover:decoration-indigo-500 text-shadow-md hover:text-shadow-lg text-shadow-indigo-500`}>
          Asteryon
        </Link>
        {children}
      </body>
    </html>
  );
}
