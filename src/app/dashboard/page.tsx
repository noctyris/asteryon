// src/app/dashboard/page.tsx
'use client';

//import { useSession } from 'next-auth/react';
import { Picture } from "@/types";
import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Dashboard() {
//  const { data: session, status } = useSession();
  const [images, setImages] = useState<Picture[] | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/getImages')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setImages(data))
      .catch((err) => setError(err.message));
  }, []);

/*Date	Wed Aug 06 2025
Instrument	Perl 150/750
Caméra	ZWO ASI120MM-S
Logiciel de stacking	SiriL
Type d'image	Ciel profond
Durée totale
*/
  return (
    <>
      {error && <p className="text-red-500">Erreur: {error}</p>}
      {!(images) ? (error ? "" : <p>Chargement...</p>) : <Page images={images} />}
    </>
  );
}

function Page({ images }: { images: Picture[] }) {
  const [key, setKey] = useState("id");
  const [reverse, setReverse] = useState(false);

  function handleChangeKey(k: string) {
    if (key === k) setReverse(!reverse);
    else {
      setKey(k);
      setReverse(false);
    }
  }

  function weirdSorting(a: any, b:any ) {
    const aVal = a[key], bVal = b[key];
    const aNum=Number(aVal), bNum=Number(bVal);

    let comp;
    if (!isNaN(aNum) && !isNaN(bNum)) comp = aNum - bNum;
    else comp = String(aVal).localeCompare(String(bVal));

    return reverse ? -comp : comp;
  }

  return (
    <div>
      <table className="w-full">
        <tbody>
          <tr>
            <th className="w-24" onClick={() => handleChangeKey("id")}>
              <div className="flex justify-center gap-x-3"><span className="flex-1 text-center">ID</span><span className="w-6">{key==="id" && (reverse ? <ChevronUp /> : <ChevronDown />)}</span></div>
            </th>
            <th onClick={() => handleChangeKey("title")}>
              <div className="flex justify-center gap-x-3"><span className="flex-1 text-center">Nom</span><span className="w-6">{key==="title" && (reverse ? <ChevronUp /> : <ChevronDown />)}</span></div>
            </th>
            <th onClick={() => handleChangeKey("capture_date")}>
              <div className="flex justify-center gap-x-3"><span className="flex-1 text-center">Date</span><span className="w-6">{key==="capture_date" && (reverse ? <ChevronUp /> : <ChevronDown />)}</span></div>
            </th>
            <th onClick={() => handleChangeKey("type")}>
              <div className="flex justify-center gap-x-3"><span className="flex-1 text-center">Type</span><span className="w-6">{key==="type" && (reverse ? <ChevronUp /> : <ChevronDown />)}</span></div>
            </th>
          </tr>
          {images.sort((a,b) => weirdSorting(a,b)).map((pic) => <Row key={pic.id} pic={pic}/>)}
        </tbody>
      </table>
    </div>
  )
}

function Row({ pic }: { pic: Picture } ) {
  return (
    <tr className="">
      <td>{pic.id}</td>
      <td>{pic.title}</td>
      <td>{pic.capture_date.slice(0,10)}</td>
      <td>{pic.type}</td>
    </tr>
  )
}
