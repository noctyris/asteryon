"use client";
import { getCldImageUrl } from "next-cloudinary";
import { useEffect, useRef } from "react";

export default function ProtectedImage({src, width, height, classname}: {src: string, width: number, height: number, classname: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const url = getCldImageUrl({
    width,
    height,
    src,
    quality: 'auto',
    format: 'webp',
    rawTransformations: [
      "if_w_gt_600",
      "l_text:Arial_40_bold:Belongs%20to%20Noctyris,co_rgb:ff0000,o_3,g_south_east,x_20,y_20",
      "if_end"
    ]
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
    }
  }, [url]);

  return (
    <div className="relative group">
      <canvas ref={canvasRef} onContextMenu={(e) => e.preventDefault()} className={classname} style={{userSelect: 'none', touchAction: 'none'}} />
      <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} />
    </div>
  );
}
