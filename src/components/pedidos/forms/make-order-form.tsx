"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import { cn, formatDateForDB, parseTotalToLocale } from "~/lib/utils";
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
    getValues,
    formState: { errors },
  } = useForm();

  function calculateTotal(idProduct: number, quantity: number) {
    const product = products.find((product) => product.id === idProduct);
    if (!product) return 0;
    return product.publicPrice * quantity;
  }

  function getNameProduct(idProduct: number) {
    const product = products.find((product) => product.id === idProduct);
    if (!product) return "";
    return product.name;
  }

  async function onSubmit(data: FieldValues) {
    const date = new Date();
    const dateToString = formatDateForDB(date);

    const newOrder = {
      idProduct: Number(data.idProduct),
      idAlumn: alumn.id,
      quantity: Number(data.quantity),
      total: calculateTotal(Number(data.idProduct), Number(data.quantity)),
      state: "pendiente", // pendiente, entregado o cancelado
      //dato del recibo
      concept: data.concept.trim(),
      writtenAmount: data.writtenAmount.trim(),
      date: dateToString,
      nameClient: alumn.fullname,
    };

    startTransition(async () => {
      const response = await createOrderAction(newOrder, alumn.id);
      if (response.success) {
        router.push(`/admin/alumnos/${alumn.id}`);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <form
        className="mx-auto flex max-w-[500px] flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="idProduct">Nombre del producto</label>
          <input
            id="idProduct"
            type="search"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
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
                className="flex items-center gap-1 text-sm text-black/80"
                key={product.id}
                value={product.id}
              >
                {product.name} -
                <span className={cn("text-md font-semibold text-black")}>
                  ${parseTotalToLocale(product.publicPrice)}
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
            placeholder="Cantidad de productos..."
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

        <div className="flex flex-col gap-1 rounded-md bg-gray-200 px-1 py-2">
          <div className="mx-3 flex flex-col gap-1">
            <h3 className="text-pretty text-lg font-semibold">
              Datos del recibo
            </h3>
            <small className="flex gap-1 rounded-md bg-white text-sm text-gray-900">
              {getNameProduct(Number(getValues("idProduct")))} - cantidad:{" "}
              {getValues("quantity")} - total:{" "}
              {parseTotalToLocale(
                calculateTotal(
                  Number(getValues("idProduct")),
                  Number(getValues("quantity")),
                ),
              )}
            </small>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="concept">Concepto del pago</label>
            <input
              id="concept"
              type="text"
              className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
              autoComplete="off"
              placeholder="Ej: Pago de..."
              {...register("concept", {
                min: {
                  value: 1,
                  message: "*Debe ser mínimo 1 caracter.",
                },
                required: "*El concepto es requerido.",
              })}
            />
            {errors.concept && (
              <ErrorMessage>{String(errors.concept.message)}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-1 rounded-md bg-gray-200 px-1 py-2">
            <label htmlFor="writtenAmount">Monto escrito</label>
            <input
              id="writtenAmount"
              className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
              type="text"
              placeholder="Ej: Quince mil pesos ..."
              autoComplete="off"
              {...register("writtenAmount", {
                min: {
                  value: 1,
                  message: "*Debe ser mínimo 1 caracter.",
                },
                required: "*El monto escrito es requerido.",
              })}
            />
            {errors.writtenAmount && (
              <ErrorMessage>
                {String(errors.writtenAmount.message)}
              </ErrorMessage>
            )}
          </div>
        </div>

        <button
          className="w-full rounded-md border-0 bg-black px-2 py-1 text-lg text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-800"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Creando pedido..." : "Agregar pedido"}
        </button>
      </form>
    </>
  );
}
