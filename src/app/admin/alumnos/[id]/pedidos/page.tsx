import { service } from "~/server/services";
import { columns } from "~/components/pedidos/tables/columns";
import { DataTable } from "~/components/pedidos/tables/data-table";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Button } from "~/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};
export const metadata: Metadata = {
  title: "Gestión de Pedidos - Instituto Zalesak",
  description: "Pedidos - Instituto Zalesak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const dynamic = "force-dynamic";

export default async function OrdersPage({ params }: Props) {
  const orders = await service.pedidos.getAllById(Number(params.id));

  return (
    <main
      className={`${GeistSans.variable} h-full flex-1 flex-col space-y-8 md:flex`}
    >
      <div className="space-y-2">
        <header className="mb-5 flex justify-between">
          <h2 className="text-pretty text-xl font-semibold">
            Pedidos del alumno
          </h2>
          <Button asChild>
            <Link
              className="flex items-center justify-center gap-1"
              href={`/admin/alumnos/${params.id}/hacer-pedido`}
            >
              <Package className="h-4 w-4" />
              Hacer Pedido
            </Link>
          </Button>
        </header>
        <DataTable data={orders} columns={columns} />
      </div>
    </main>
  );
}
