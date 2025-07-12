"use client";

import { CldImage } from "next-cloudinary";
import { Picture } from "@/types";

export default function ImagePage({ pic }: { pic: Picture }) {
  return (
    <>
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
      <div className="w-9/10 mt-4 mx-auto">
        <h1 className="underline decoration-indigo-500 md:decoration-indigo-500/25 hover:decoration-indigo-500 text-shadow-sm hover:text-shadow-md text-shadow-indigo-500 text-xl">
          {pic.title}
        </h1>
      </div>
    </>
  );
}
