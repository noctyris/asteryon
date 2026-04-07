// src/app/dashboard/page.tsx

import { fetchImages } from "@/app/lib/data";

export default async function Dashboard() {
  const rawPictures = await fetchImages();
  const table = rawPictures.map((pic) => (
    <tr key={pic.id}>
      <td>{pic.id}</td>
      <td><input defaultValue={pic.title} type="text" /></td>
      <td>{pic.capture_date?.toString().slice(0, 15)}</td>
      <td><input defaultValue={pic.scope} type="text" /></td>
      <td><input defaultValue={pic.camera} type="text" /></td>
      {/*<td>{pic.filters}</td>*/}
      <td><input defaultValue={pic.stacking} type="text" /></td>
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

