import type { Metadata } from "next";
import { Montserrat_Alternates, Montserrat } from "next/font/google";
import LayoutInfo from "@/components/LayoutInfo";
import "./globals.css";

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
        className={`${montserrat.className} ${montserratAlternates.variable} antialiased py-2`}
      >
        <LayoutInfo className={`${montserratAlternates.className}`} />
        {children}
      </body>
    </html>
  );
}
