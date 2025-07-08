"use client";

import UploadButton from "@/components/UploadButton";
import { filter_t } from "@/types";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [publicID, setPublicID] = useState<string | undefined>("");
  const [captureDate, setCaptureDate] = useState("");
  const [scope, setScope] = useState("");
  const [camera, setCamera] = useState("");
  const [filters, setFilters] = useState<filter_t[]>([]);
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

  function updateFilter(
    index: number,
    field: "type" | "exposure" | "count",
    value: string,
  ) {
    setFilters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function removeFilter(index: number) {
    setFilters((prev) => prev.filter((_, i) => i !== index));
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
        <select
          defaultValue="Type d'image"
          onChange={(e) => setType(e.target.value)}
        >
          <option disabled className={type ? "hidden" : "block"}>
            {"Type d\'image"}
          </option>
          <option>Ciel profond</option>
          <option>Lunaire</option>
          <option>Système solaire</option>
          <option>Open Field</option>
        </select>
        <div className="flex flex-col items-center justify-center">
          {filters.map((r, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                value={r.type}
                onChange={(e) => updateFilter(index, "type", e.target.value)}
              />
              <input
                value={r.count}
                onChange={(e) => updateFilter(index, "count", e.target.value)}
                type="number"
              />
              <input
                value={r.exposure}
                onChange={(e) =>
                  updateFilter(index, "exposure", e.target.value)
                }
                type="number"
              />
              <span>s</span>
              <button
                type="button"
                onClick={() => removeFilter(index)}
                className="text-red-600 hover:underline ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-black hover:underline ml-2"
            onClick={() =>
              setFilters([
                ...filters,
                { type: "filter", exposure: 30, count: 0 },
              ])
            }
          >
            Ajouter un filtre
          </button>
        </div>
        <UploadButton setPublicID={setPublicID} publicID={publicID} />
        <button
          type="submit"
          disabled={!publicID}
          className="bg-black text-white p-2 rounded-full hover:shadow-xl"
        >
          Envoyer
        </button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
}
