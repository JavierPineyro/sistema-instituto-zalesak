import { parseTotalToLocale } from "~/lib/utils";
import { service } from "~/server/services";

export default async function RecentOrders() {
  const orders = await service.pedidos.getLastPendingOrders(5);
  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}

type OrderCard = {
  id: number;
  idProduct: number;
  quantity: number;
  total: number;
  producto: {
    name: string;
    publicPrice: number;
    teacherPrice: number;
  };
};

function OrderItem({ order }: { order: OrderCard }) {
  const publicIncome = order.producto.publicPrice * order.quantity;
  const teacherIncome = order.producto.teacherPrice * order.quantity;
  const income = parseTotalToLocale(publicIncome - teacherIncome);
  return (
    <div className="flex items-center">
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {order.quantity} x {order.producto.name}
        </p>
        <p className="text-muted-foreground text-xs">
          ganancia actual (precio público - precio profesor): {income}
        </p>
      </div>
      <div className="ml-auto font-medium">
        +{parseTotalToLocale(order.total)}
      </div>
    </div>
  );
}
