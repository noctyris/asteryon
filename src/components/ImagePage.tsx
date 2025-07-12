"use client";

import { CldImage } from "next-cloudinary";
import { Picture } from "@/types";

export function formatDuration(seconds: number): string {
  if (seconds < 1e-3) {
    const µs = Math.round(seconds * 1e6);
    return `${µs}µs`;
  }

  if (seconds < 1) {
    const ms = Math.round(seconds * 1000);
    return `${ms}ms`;
  }

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hrs) parts.push(`${hrs}h`);
  if (mins) parts.push(`${mins}mn`);
  if (secs || (!hrs && !mins)) parts.push(`${secs}s`);

  return parts.join(" ");
}


export default function ImagePage({ pic }: { pic: Picture }) {
  const filters = pic.filters?.map((f) => (
    <div key={f.type} className="bg-gray-800 w-fit h-fit p-3 rounded-xl">
        <p><b>{f.type}</b></p>
        <p>{f.count} * {formatDuration(f.exposure)}</p>
        <p>{formatDuration(f.count * f.exposure)}</p>
      </div>
  ));
  
  const totalDuration = formatDuration(
    (pic.filters ?? []).reduce((acc, f) => acc + (f.count * f.exposure), 0)
  );

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
      <div className="w-9/10 mt-4 mx-auto flex flex-row">
        <div className="w-1/2 flex flex-col">
        <h1 className="underline decoration-indigo-500 md:decoration-indigo-500/25 hover:decoration-indigo-500 text-shadow-sm hover:text-shadow-md text-shadow-indigo-500 text-xl">
          {pic.title}
        </h1>
        <table className="border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <th className="text-left pr-4 text-gray-500">Date</th>
              <td>{pic.capture_date?.toString().slice(0,15)}</td>
            </tr>
            <tr>
              <th className="text-left pr-4 text-gray-500">Instrument</th>
              <td>{pic.scope}</td>
            </tr>
            <tr>
              <th className="text-left pr-4 text-gray-500">Caméra</th>
              <td>{pic.camera}</td>
            </tr>
            <tr>
              <th className="text-left pr-4 text-gray-500">Logiciel de stacking</th>
              <td>{pic.stacking}</td>
            </tr>
            <tr>
              <th className="text-left pr-4 text-gray-500">{"Type d\'image"}</th>
              <td>{pic.type}</td>
            </tr>
            <tr>
              <th className="text-left pr-4 text-gray-500">Durée totale</th>
              <td>{totalDuration}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <div className="w-1/2 grid grid-cols-3 items-center justify-center">
          {filters}
        </div>
      </div>
    </>
  );
}
