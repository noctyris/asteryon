import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchImages() {
  return await sql`SELECT * FROM pictures ORDER BY capture_date DESC`;
}

export default sql;
