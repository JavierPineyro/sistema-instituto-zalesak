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
};

export default function EditOrderForm({ order }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      state: order.state,
    },
  });

  async function onSubmit(data: FieldValues) {
    const orderToUpdate = {
      id: order.id,
      idProduct: order.idProduct,
      quantity: order.quantity,
      idAlumn: order.idAlumn,
      total: order.total,
      state: data.state,
    };

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
        <label htmlFor="state">Estado</label>
        <select
          id="state"
          className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
          {...register("state", { required: "*El estado es requerido." })}
        >
          <option className="text-orange-600" value="pendiente">
            Pendiente
          </option>
          <option className="text-green-600" value="entregado">
            Entregado
          </option>
          <option className="text-red-600" value="cancelado">
            Cancelado
          </option>
        </select>
        {errors.state && (
          <ErrorMessage>{String(errors.state.message)}</ErrorMessage>
        )}
      </div>

      <button
        className="w-full rounded-md border-0 bg-black px-2 py-1 text-lg text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-800"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Actualizando..." : "Actualizar"}
      </button>
    </form>
  );
}
