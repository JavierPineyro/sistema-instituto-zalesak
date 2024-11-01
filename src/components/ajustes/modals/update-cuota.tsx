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
import updateCuotaAction from "~/server/actions/ajustes/update-cuota";

type Props = {
  cuota: {
    name: string;
    id: number;
    price: number;
    updatedAt: Date;
  };
};
export default function UpdateCuotaModal({ cuota }: Props) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: cuota.price,
    },
  });
  const router = useRouter();

  async function onSubmit(values: FieldValues) {
    startTransition(async () => {
      const newCuota = {
        id: cuota.id,
        name: cuota.name,
        price: Number(values.price),
        updatedAt: new Date(),
      };

      const response = await updateCuotaAction(newCuota);
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
        aria-describedby="Modal es para editar el precio de la cuota"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Editar cuota</DialogTitle>
          <p className="text-muted-foreground">
            Última actualización:{" "}
            {cuota.updatedAt.toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label
              className="leading-1 mt-1 block text-sm font-medium text-black/80"
              htmlFor="price"
            >
              Precio de la cuota
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
