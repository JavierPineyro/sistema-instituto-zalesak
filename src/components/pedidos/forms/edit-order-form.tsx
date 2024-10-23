"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import { OrderTable as OrderData } from "~/lib/types";
import editOrderAction from "~/server/actions/pedidos/edit-action";

type Props = {
  order: OrderData;
  alumns: { id: number; fullname: string }[];
  products: { id: number; name: string; publicPrice: number }[];
};

export default function EditOrderForm({ order, alumns, products }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idProduct: order.idProduct,
      quantity: order.quantity,
      idAlumn: order.idAlumn,
      state: order.state,
    },
  });

  function calculateTotal(idProduct: number, quantity: number) {
    const product = products.find((product) => product.id === idProduct);
    if (!product) return 0;
    return product.publicPrice * quantity;
  }

  async function onSubmit(data: FieldValues) {
    const orderToUpdate = {
      id: order.id,
      idProduct: Number(data.idProduct),
      quantity: Number(data.quantity),
      idAlumn: Number(data.idAlumn),
      state: data.state,
      total: calculateTotal(Number(data.idProduct), Number(data.quantity)),
    };
    console.log("Data Pedido", orderToUpdate);

    startTransition(async () => {
      const response = await editOrderAction(orderToUpdate);
      if (response.success) {
        router.push(`/admin/pedidos`);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="idAlumn">Alumno</label>
        <input
          id="idAlumn"
          type="search"
          autoComplete="off"
          list="alumns"
          placeholder="Buscar..."
          {...register("idAlumn", { required: "*El alumno es requerido." })}
        />
        <datalist id="alumns">
          {alumns.map((alumn) => (
            <option key={alumn.id} value={alumn.id}>
              {alumn.fullname}
            </option>
          ))}
        </datalist>
        {errors.idAlumn && (
          <ErrorMessage>{String(errors.idAlumn.message)}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="idProduct">Nombre del producto</label>
        <input
          id="idProduct"
          type="search"
          autoComplete="off"
          list="products"
          placeholder="Buscar..."
          {...register("idProduct", { required: "*El producto es requerido." })}
        />
        <datalist id="products">
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </datalist>
        {errors.idProduct && (
          <ErrorMessage>{String(errors.idProduct.message)}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="quantity">Cantidad</label>
        <input
          id="quantity"
          className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
          type="number"
          min="1"
          {...register("quantity", {
            min: {
              value: 1,
              message: "*Debe ser 1 o mayor.",
            },
            required: "*La cantidad es requerida.",
          })}
        />
        {errors.quantity && (
          <ErrorMessage>{String(errors.quantity.message)}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="state">Estado</label>
        <select
          id="state"
          className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
          {...register("state", { required: "*El estado es requerido." })}
        >
          <option value="pendiente">Pendiente</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        {errors.quantity && (
          <ErrorMessage>{String(errors.quantity.message)}</ErrorMessage>
        )}
      </div>

      <button
        className="w-full rounded-md border-0 bg-black px-2 py-1 text-lg text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-800"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Cargando pedido..." : "Actualizar"}
      </button>
    </form>
  );
}
