"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function Page() {
  const [resource, setResource] = useState();

  return (
    <>
      <h1 className="text-5xl">Upload</h1>
      <CldUploadWidget
        options={{
          multiple: false,
          sources: ["local"],
          cropping: false,
          clientAllowedFormats: ["webp", "png", "jpg", "jpeg"],
        }}
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result, { widget }) => {
          setResource(result?.info);
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => {
          function handleClick() {
            setResource(undefined);
            open();
          }
          return <button onClick={handleClick}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </>
  );
}
