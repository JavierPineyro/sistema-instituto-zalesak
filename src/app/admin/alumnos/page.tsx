import { type Metadata } from "next"
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import HeaderAlumno from "~/components/alumnos/header-nav";
import { mockAlumn } from "~/components/alumnos/data";
import { columns } from "~/components/alumnos/columns";
import { DataTable } from "~/components/alumnos/data-table";

export const metadata: Metadata = {
  title: "Gestión de Alumnos - Instituto Zalesak",
  description: "Panel de Gestión de Alumnos - Instituto Zalesak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function AlumnsPage() {
  // const data = await api.alumnos.list()
  return (
    <main className={`${GeistSans.variable} h-full flex-1 flex-col space-y-8 p-8 md:flex`}>
      <div className="space-y-2">
        <HeaderAlumno />
        <DataTable data={mockAlumn} columns={columns} />
      </div>
    </main>
  )
}