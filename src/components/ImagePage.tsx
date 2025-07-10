"use client";

import { CldImage } from "next-cloudinary";
import { Picture } from "@/types";

export default function ImagePage({ pic }: { pic: Picture }) {
  return (
    <div className="mt-5 w-full flex justify-center">
      <CldImage
        width="0"
        height="0"
        src={pic.publicID}
        sizes="100vw"
        alt={pic.title}
        className="w-auto
          h-auto
          max-w-full
          max-h-[calc(100vh-100px)]
          object-contain
          rounded-xl"
      />
    </div>
  )
}
