import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoBack({ path = "/admin/alumnos" }: { path: string }) {
  return (
    <Link href={path}>
      <ArrowLeft className="mr-2 inline size-3" />
      Volver
    </Link>
  );
}
