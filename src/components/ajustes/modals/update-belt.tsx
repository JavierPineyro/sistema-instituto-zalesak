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
import updateBeltAction from "~/server/actions/ajustes/update-belt";

type Props = {
  belt: {
    name: string;
    id: number;
    description: string | null;
  };
};
export default function UpdateBeltModal({ belt }: Props) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: belt.name,
      description: belt.description ?? "",
    },
  });
  const router = useRouter();

  async function onSubmit(data: FieldValues) {
    startTransition(async () => {
      const newBelt = {
        id: belt.id,
        name: data.name.trim() as string,
        description: data.description.trim() as string,
      };

      const response = await updateBeltAction(newBelt);
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
          <DialogTitle>Editar cinturón</DialogTitle>
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
              className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
              placeholder="ej: cinturón negro..."
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
                  value: 100,
                  message: "*No debe superar los 100 caracteres.",
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
              htmlFor="description"
            >
              Descripción
            </label>
            <input
              id="description"
              type="text"
              className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
              placeholder="ej: cinturón rojo punta..."
              {...register("description", {
                maxLength: {
                  value: 254,
                  message: "*No debe superar los 254 caracteres.",
                },
              })}
            />
            {errors.description && (
              <ErrorMessage>{String(errors.description.message)}</ErrorMessage>
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
