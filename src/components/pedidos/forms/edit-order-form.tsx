"use client";

import { OrderTable } from "~/lib/types";

export default function EditOrderForm({ order }: { order: OrderTable }) {
  return (
    <form>
      <input type="text" name="nombre" value={order.fullname} />
      <input type="text" name="direccion" value={order.fullname} />
      <button type="submit">Guardar</button>
    </form>
  );
}
