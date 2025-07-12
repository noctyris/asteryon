export const dynamic = "force-dynamic";

import { fetchImages } from "@/app/lib/data";
import ImageCard from "@/components/ImageCard";
import { Picture } from "@/types";

export default async function Home() {
  const rawPictures = await fetchImages();
  const pictures = rawPictures.map((pic) => (
    <ImageCard key={pic.id} pic={pic as Picture} />
  ));

  return (
    <>
      <main className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 m-w-[1200px] mx-auto">
        {pictures}
      </main>
    </>
  );
}
