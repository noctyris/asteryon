"use client";

import { CldImage } from "next-cloudinary";
import { Picture } from "@/types";
import Link from "next/link";

export default function ImageCard({ pic }: { pic: Picture }) {
  return (
    <Link
      href={`/image/${pic.id}`}
      className="relative aspect-square rounded-3xl overflow-hidden shadow group border-black hover:border-white"
    >
      {/* Image en fond, z-0 */}
      <CldImage
        width="1280"
        height="960"
        src={pic.publicID}
        sizes="100vw"
        alt={pic.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 z-0"
      />

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10 opacity-100 md:opacity-0 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 opacity-100 md:opacity-0 group-hover:opacity-100">
        <h2 className="text-lg font-semibold truncate">{pic.title}</h2>
        <p className="text-sm text-gray-300">
          {pic.capture_date?.toString().slice(0, 10)}
        </p>
        <p className="text-xs text-gray-400">{pic.type}</p>
      </div>
    </Link>
  );
}
