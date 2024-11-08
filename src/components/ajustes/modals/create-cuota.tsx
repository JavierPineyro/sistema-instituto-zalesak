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
import { cn } from "~/lib/utils";
import createCuotaAction from "~/server/actions/ajustes/create-cuota";

export default function CreateCuotaModal() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  async function onSubmit(values: FieldValues) {
    startTransition(async () => {
      const newCuota = {
        price: Number(values.price),
      };

      const response = await createCuotaAction(newCuota);
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
        <Button>Agregar precio de la cuota</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Modal es para crear el precio de la cuota"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Agregar precio de cuota</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label
              className="leading-1 mt-1 block text-sm font-medium text-black/80"
              htmlFor="price"
            >
              Precio
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
              placeholder="ej: $12000..."
              {...register("price", {
                required: {
                  value: true,
                  message: "*Precio es requerido.",
                },
                min: {
                  value: 1,
                  message: "*Debe ser mínimo $1.",
                },
              })}
            />
            {errors.price && (
              <ErrorMessage>{String(errors.price.message)}</ErrorMessage>
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
