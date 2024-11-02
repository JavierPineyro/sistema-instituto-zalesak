import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import HeaderEquipamiento from "~/components/equipamientos/header-equipamiento";
import { columns } from "~/components/equipamientos/tables/columns";
import { DataTable } from "~/components/equipamientos/tables/data-table";
import { service } from "~/server/services";

export const metadata: Metadata = {
  title: "Equipamiento - Instituto Zalesak",
  description: "Panel de Gestión de Equipamiento",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const dynamic = "force-dynamic";

export default async function PedidosPage() {
  const data = await service.inventario.list();

  return (
    <main
      className={`${GeistSans.variable} h-full flex-1 flex-col space-y-8 p-8 md:flex`}
    >
      <div className="space-y-2">
        <HeaderEquipamiento />
        <DataTable data={data} columns={columns} />
      </div>
    </main>
  );
}
