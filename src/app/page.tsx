export const dynamic = 'force-dynamic';

import { fetchImages } from "@/app/lib/data";
import ImageCard from "@/components/ImageCard";
import Link from "next/link";

interface Picture {
  id: number;
  title: string;
  publicID: string;
  capture_date?: string;
  scope?: string;
  camera?: string;
  filters?: { type: string; exposure: number; count: number; };
  stacking?: string;
  type?: string;
}

export default async function Home() {
  const rawPictures = await fetchImages();
  const pictures = rawPictures.map((pic) => <ImageCard key={pic.id} pic={pic as Picture} />);

  return (
    <>
      <header className="flex items-center justify-between p-7 pb-9 bg-white text-black">
        <h1 className="text-5xl">Asteryon</h1>
        <Link href="/upload">Upload</Link>
      </header>
      <main>
        {pictures}
      </main>
    </>
  );
}
