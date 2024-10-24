"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import { parseTotalToLocale } from "~/lib/utils";
import createOrderAction from "~/server/actions/pedidos/create-action";

type Props = {
  alumn: { id: number; fullname: string };
  products: { id: number; name: string; publicPrice: number }[];
};

export default function MakeOrderForm({ alumn, products }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function calculateTotal(idProduct: number, quantity: number) {
    const product = products.find((product) => product.id === idProduct);
    if (!product) return 0;
    return product.publicPrice * quantity;
  }

  async function onSubmit(data: FieldValues) {
    const newOrder = {
      idProduct: Number(data.idProduct),
      idAlumn: alumn.id,
      quantity: Number(data.quantity),
      total: calculateTotal(Number(data.idProduct), Number(data.quantity)),
      state: "pendiente", // pendiente, entregado o cancelado
    };

    startTransition(async () => {
      const response = await createOrderAction(newOrder, alumn.id);
      if (response.success) {
        router.push(`/admin/alumnos/${alumn.id}`);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="idProduct">Nombre del producto</label>
        <input
          id="idProduct"
          type="search"
          autoComplete="off"
          list="products"
          placeholder="Buscar..."
          {...register("idProduct", {
            required: "*El producto es requerido.",
          })}
        />
        <datalist id="products">
          {products.map((product) => (
            <option
              className="flex items-center gap-1"
              key={product.id}
              value={product.id}
            >
              {product.name} -
              <span className="text-sm text-black/60">
                ${product.publicPrice}
              </span>
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

      <button
        className="w-full rounded-md border-0 bg-black px-2 py-1 text-lg text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-800"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Cargando pedido..." : "Agregar pedido"}
      </button>
    </form>
  );
}
