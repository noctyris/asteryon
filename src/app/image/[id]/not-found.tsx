import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Image non trouvée</h1>
      <p>{"Cette image n\'existe pas ou a été supprimée."}</p>
      <Link className="mt-4" href="/">{"Retour à l\'accueil"}</Link>
    </div>
  );
}

