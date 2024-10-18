import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import HeaderPedidos from "~/components/pedidos/header-pedidos";
import { service } from "~/server/services";

export const metadata: Metadata = {
  title: "Gestión de Pedidos - Instituto Zalesak",
  description: "Panel de Gestión de Pedidos - Instituto Zalesak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const dynamic = "force-dynamic";

export default async function PedidosPage() {
  const data = await service.pedidos.list();
  return (
    <main
      className={`${GeistSans.variable} h-full flex-1 flex-col space-y-8 p-8 md:flex`}
    >
      <div className="space-y-2">
        <HeaderPedidos />
        <DataTable data={data} columns={columns} />
      </div>
    </main>
  );
}
