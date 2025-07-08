"use client";

import UploadButton from "@/components/UploadButton";
import { useState } from "react";

type filter_t = {
  type: string;
  exposure: number;
  count: number;
};

export default function Page() {
  const [title, setTitle] = useState("");
  const [publicID, setPublicID] = useState("");
  const [captureDate, setCaptureDate] = useState("");
  const [scope, setScope] = useState("");
  const [camera, setCamera] = useState("");
  const [filters, setFilters] = useState<filter_t[]>([{type: "TEST", exposure: 11, count: 22}]);
  const [stacking, setStacking] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/add-picture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          publicID,
          capture_date: captureDate,
          scope,
          camera,
          filters,
          stacking,
          type,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit to add-picture API");

      const json = await res.json();
      if (json.success) setStatus("Image enregistrée !");
      else setStatus("Erreur API: " + json.error);
    } catch (err) {
      console.error(err);
      setStatus("Une erreur est survenue");
    }
  }

  return (
    <div>
      <h1 className="text-5xl">Upload</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 p-4 justify-center items-center bg-white text-black w-fit mx-auto rounded-3xl"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="border-b"
        />
        <input
          value={captureDate}
          onChange={(e) => setCaptureDate(e.target.value)}
          type="date"
          className="border-b"
        />
        <input
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          placeholder="Instrument"
          className="border-b"
        />
        <input
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          placeholder="Caméra"
          className="border-b"
        />
        <input
          value={stacking}
          onChange={(e) => setStacking(e.target.value)}
          placeholder="Logiciel de stacking"
          className="border-b"
        />
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type"
          className="border-b"
        />
        <UploadButton setPublicID={setPublicID} publicID={publicID} />
        <button
          type="submit"
          disabled={!publicID}
          className="bg-black text-white p-2 rounded-full"
        >
          Envoyer
        </button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
}
