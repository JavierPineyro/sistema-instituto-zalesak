import PdfOrdersList from "~/components/pdf/pdf-orders-list";
import { service } from "~/server/services";

export const dynamic = "force-dynamic";

export default async function OrdersListPage() {
  const data = await service.pedidos.getPendingOrders();

  if (!data) {
    return (
      <div className="text-center ">Lista de pedidos no se pudo generar</div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <header>
        <h1 className="text-3xl font-bold">Lista de pedidos</h1>
      </header>
      <PdfOrdersList orders={data} />
    </div>
  );
}
