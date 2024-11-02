"use client";

import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import { useRouter } from "next/navigation";
import createEquipmentAction from "~/server/actions/equipamientos/create-action";
export default function CreateEquipmentForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  async function onSubmit(data: FieldValues) {
    startTransition(async () => {
      const observationData: string | null =
        data.observation.length > 0 ? data.observation.trim() : null;

      const newEquipment = {
        name: data.name.trim() as string,
        quantity: Number(data.quantity),
        observation: observationData,
      };
      const response = await createEquipmentAction(newEquipment);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.refresh();
      } else {
        console.error(response);
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <form
        className="item-center flex w-full flex-col justify-between gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label className="text-black/80 " htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            placeholder="ej: Bolsa de boxeo..."
            {...register("name", {
              required: {
                value: true,
                message: "*Nombre es requerido.",
              },
              min: {
                value: 1,
                message: "*No puede estar vacío.",
              },
              maxLength: {
                value: 254,
                message: "*No debe superar los 254 caracteres.",
              },
            })}
          />
          {errors.name && (
            <ErrorMessage>{String(errors.name.message)}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black/80 " htmlFor="quantity">
            Cantidad
          </label>
          <input
            id="quantity"
            type="number"
            placeholder="ej: 2..."
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            {...register("quantity", {
              min: {
                value: 0,
                message: "*La cantidad debe ser mayor a 0.",
              },
              required: "*La cantidad es requerida.",
            })}
          />
          {errors.quantity && (
            <ErrorMessage>{String(errors.quantity.message)}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black/80 " htmlFor="observation">
            Observaciones
          </label>
          <input
            id="observation"
            type="text"
            autoComplete="off"
            placeholder="ej: Tiene las cadenas desgastadas..."
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            {...register("observation", {
              maxLength: {
                value: 254,
                message:
                  "*Las observaciones no deben superar los 254 caracteres.",
              },
            })}
          />
          {errors.observation && (
            <ErrorMessage>{String(errors.observation.message)}</ErrorMessage>
          )}
        </div>
        <input
          disabled={isPending}
          className="rounded-md border-0 bg-black px-2 py-1 text-lg text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-800"
          type="submit"
          value={isPending ? "Cargando producto..." : "Agregar producto"}
        />
      </form>
    </>
  );
}
