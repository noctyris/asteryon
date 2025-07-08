"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

type filter_t = {
  type:     string;
  exposure: number;
  count:    number;
}

export default function Page() {
  const [title, setTitle] = useState('');
  const [publicID, setPublicID] = useState('');
  const [captureDate, setCaptureDate] = useState('');
  const [scope, setScope] = useState('');
  const [camera, setCamera] = useState('');
  const [filters, setFilters] = useState<filter_t[]>([]);
  const [stacking, setStacking] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch('/api/add-picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, publicID, capture_date: captureDate, scope, camera, filters, stacking, type
        }),
      });

      if (!res.ok) throw new Error('Failed to submit to add-picture API');

      const json = await res.json();
      if (json.success) setStatus('Image enregistrée !');
      else setStatus('Erreur API: ' + json.error);
    } catch (err) {
      console.error(err);
      setStatus('Une erreur est survenue');
    }
  }

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
	        onSuccess={(result, { widget }) => {
	          setPublicID(result?.info?.public_id);
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
      </div>
    </div>
  );
}
