// src/app/dashboard/page.tsx

import { fetchImages } from "@/app/lib/data";

export default async function Dashboard() {
  const rawPictures = await fetchImages();
  const table = rawPictures.map((pic) => (
    <tr key={pic.id}>
      <td>{pic.id}</td>
      <td>{pic.title}</td>
      <td>{pic.publicID}</td>
      <td>{pic.capture_date?.toString().slice(0, 15)}</td>
      <td>{pic.scope}</td>
      <td>{pic.camera}</td>
      {/*<td>{pic.filters}</td>*/}
      <td>{pic.stacking}</td>
      <td>{pic.type}</td>
    </tr>
   )
  )

  return (
    <div>
      <table><tbody>{table}</tbody></table>
    </div>
  );
}

