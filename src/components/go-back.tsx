import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoBack({ path = "/admin/alumnos" }: { path: string }) {
  return (
    <Link href={path}>
      <ArrowLeft className="inline mr-2 size-2" />
      Volver
    </Link>
  )
}