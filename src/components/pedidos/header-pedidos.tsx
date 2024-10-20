import { Package } from "lucide-react";

export default function HeaderPedidos() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="flex items-center justify-center gap-1 text-2xl font-bold tracking-tight">
          Pedidos <Package className="mr-1 size-5" />
        </h2>
        <p className="text-muted-foreground">
          Aquí podrás ver la lista de pedidos
        </p>
      </div>
    </div>
  );
}
