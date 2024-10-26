import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};

export default async function OrdersPage({ params }: Props) {
  const orders = await service.pedidos.getAllById(Number(params.id));

  return (
    <section className="px-5">
      <header className="mb-5 flex justify-between">
        <h2 className="text-pretty text-xl font-semibold">
          Pedidos del alumno
        </h2>
      </header>
      <DataTable data={orders} columns={columns} />
    </section>
  );
}
