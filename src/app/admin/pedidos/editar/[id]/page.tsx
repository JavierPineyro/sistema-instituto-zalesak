import GoBack from "~/components/go-back";
import { service } from "~/server/services";
import { EditIcon } from "lucide-react";
import EditOrderForm from "~/components/pedidos/forms/edit-order-form";

type Props = {
  params: { id: string };
};

export default async function OrderEditPage({ params }: Props) {
  const order = await service.pedidos.getById(Number(params.id));

  if (!order) {
    return (
      <div>
        <GoBack path="/admin/pedidos" />
        <h1 className="text-center">Pedido no encontrado</h1>;
      </div>
    );
  }

  return (
    <section className="mx-auto flex max-w-[500px] flex-col gap-3">
      <div className="flex flex-col gap-2">
        <GoBack path="/admin/pedidos" />
        <h1 className="flex items-center text-2xl font-bold tracking-tight">
          Editar Pedido
          <EditIcon className="h-5 w-5" />
        </h1>
      </div>
      <EditOrderForm order={order} />
    </section>
  );
}
