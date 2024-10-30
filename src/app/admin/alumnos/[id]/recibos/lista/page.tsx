import { service } from "~/server/services";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { DataTable } from "~/components/recibos/tables/data-table";
import { columns } from "~/components/recibos/tables/columns";

type Props = {
  params: {
    id: string;
  };
};
export const metadata: Metadata = {
  title: "Gestión de Pedidos - Instituto Zalesak",
  description: "Recibos - Instituto Zalesak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const dynamic = "force-dynamic";

export default async function RecievePage({ params }: Props) {
  const data = await service.recibos.getAllByAlumnId(Number(params.id));

  return (
    <main
      className={`${GeistSans.variable} h-full flex-1 flex-col space-y-8 md:flex`}
    >
      <div className="space-y-2">
        <header className="mb-5 flex justify-between">
          <h2 className="text-pretty text-xl font-semibold">
            Recibos del alumno
          </h2>
        </header>
        <DataTable data={data} columns={columns} />
      </div>
    </main>
  );
}
