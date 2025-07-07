"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

type filter_t = {
  type:     string;
  exposure: number;
  count:    number;
}

export default function Page() {
  const [resource, setResource] = useState();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [scope, setScope] = useState('');
  const [camera, setCamera] = useState('');
  const [filters, setFilters] = useState<filter_t[]>([]);
  const [stacking, setStacking] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  console.log(resource);

  return (
    <div>
      <h1 className="text-5xl">Upload</h1>
      <div>
	      <CldUploadWidget
	        options={{
	          multiple: false,
	          sources: ["local"],
	          cropping: false,
	          clientAllowedFormats: ["webp", "png", "jpg", "jpeg"],
	        }}
	        signatureEndpoint="/api/sign-cloudinary-params"
	        onSuccess={(result) => {
	          setResource(result?.info);
	        }}
	        onQueuesEnd={({ widget }) => {
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
      </div>
    </div>
  );
}
