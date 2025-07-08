"use client";

import { CldImage } from  "next-cloudinary";

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

export default function ImageCard({ pic }: { pic: Picture }) {
  return (
    <div className="flex flex-col border rounded-3xl shadow overflow-hidden h-[400px] aspect-square">
      <div className="flex-1 relative">
        <CldImage
          width="1280"
          height="960"
          src={pic.publicID}
          sizes="100vw"
          alt="Uploaded image"
          className="m-h-full w-fit"
        />
      </div>
      <div className="p-2">
        <h2 className="text-xl mt-2">{pic.title}</h2>
        <p className="text-gray-600">{pic.capture_date?.toString().slice(0, 10)}</p>
        <p className="text-sm text-gray-400">{pic.type}</p>
      </div>
    </div>
  )
}
