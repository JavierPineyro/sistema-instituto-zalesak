import { type Metadata } from "next";
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import HeaderProductos from "~/components/productos/header-productos";
import { DataTable } from "~/components/productos/tables/data-table";
import { columns } from "~/components/productos/tables/columns";
import { service } from "~/server/services";

export const metadata: Metadata = {
  title: "Productos y Precios - Instituto Zalesak",
  description: "Panel de Admnistracion de Productos y Precios",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const data = await service.precios.list();

  return (
    <main
      className={`${GeistSans.variable} h-full flex-1 flex-col space-y-8 p-8 md:flex`}
    >
      <div className="space-y-2">
        <HeaderProductos />
        <DataTable data={data} columns={columns} />
      </div>
    </main>
  );
}
