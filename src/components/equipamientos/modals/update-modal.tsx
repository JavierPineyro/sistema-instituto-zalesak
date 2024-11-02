"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Inventory } from "~/lib/types";
import { cn } from "~/lib/utils";
import updateEquipmentAction from "~/server/actions/equipamientos/update-action";

type Props = {
  equipment: Inventory;
};

export default function UpdateEquipmentModal({ equipment }: Props) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: equipment.name,
      quantity: equipment.quantity,
      observation: equipment.observation ?? "",
    },
  });
  const router = useRouter();

  async function onSubmit(data: FieldValues) {
    const newObservation =
      data.observation.length > 0 ? data.observation.trim() : null;
    startTransition(async () => {
      const newEquipment = {
        id: equipment.id,
        name: data.name.trim() as string,
        quantity: Number(data.quantity),
        observation: newObservation,
      };

      const response = await updateEquipmentAction(newEquipment);
      if (response.success) {
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Modal es para editar cinturones"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Editar equipo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label
              className="leading-1 mt-1 block text-sm font-medium text-black/80"
              htmlFor="name"
            >
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
                  message: "*Debe ser mínimo 1 caracter.",
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
            <label
              className="leading-1 mt-1 block text-sm font-medium text-black/80"
              htmlFor="quantity"
            >
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

          <div className="mt-4 w-full">
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={isPending}
                className={cn(
                  "flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                )}
                type="submit"
              >
                Guardar
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
