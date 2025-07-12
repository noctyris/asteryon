import { use } from "react";
import { notFound } from "next/navigation";
import { fetchImages } from "@/app/lib/data";
import ImagePage from "@/components/ImagePage";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const images = use(fetchImages());
  const image = images.find((img) => img.id.toString() === id);

  if (!image) notFound();

  if (!image) return <p>Image not found</p>;

  return (
    <div>
      <ImagePage pic={image} />
    </div>
  );
}
