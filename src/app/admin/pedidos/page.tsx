import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import HeaderPedidos from "~/components/pedidos/header-pedidos";
import { columns } from "~/components/pedidos/tables/columns";
import { DataTable } from "~/components/pedidos/tables/data-table";
import { OrderTable, State } from "~/lib/types";
import { formatPedidosResponse } from "~/lib/utils";
import { service } from "~/server/services";

export const metadata: Metadata = {
  title: "Gestión de Pedidos - Instituto Zalesak",
  description: "Panel de Gestión de Pedidos - Instituto Zalesak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const dynamic = "force-dynamic";

export default async function PedidosPage() {
  //const response = await service.pedidos.list();
  //const data = formatPedidosResponse(response);
  /*{
     fullname: string;
     name: string;
     publicPrice: number;
     id: number;
     idProduct: number;
     quantity: number;
     idAlumn: number | null;
     total: number;
     state: string;
 }*/
  const data: OrderTable[] = [
    {
      fullname: "Juan Perez",
      name: "Guantes protectores",
      publicPrice: 10000,
      id: 1,
      idProduct: 1,
      quantity: 1,
      idAlumn: 1,
      total: 10000,
      state: "entregado",
    },
    {
      fullname: "Ana Mertens",
      name: "Bucales medianos",
      publicPrice: 12000,
      id: 2,
      idProduct: 2,
      quantity: 2,
      idAlumn: 2,
      total: 24000,
      state: "pendiente",
    },
    {
      fullname: "Juan Perez",
      name: "Cinturon Negro",
      publicPrice: 10000,
      id: 3,
      idProduct: 3,
      quantity: 1,
      idAlumn: 1,
      total: 10000,
      state: "cancelado",
    },
  ];
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
