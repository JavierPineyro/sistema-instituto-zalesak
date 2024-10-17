import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoBack({ path = "/admin/alumnos" }: { path: string }) {
  return (
    <Link
      className="rounded-md px-2 py-1 hover:text-gray-600 transition-colors"
      href={path}
    >
      <ArrowLeft className="mr-2 inline size-3" />
      Volver
    </Link>
  );
}
