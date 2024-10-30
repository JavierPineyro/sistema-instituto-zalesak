"use client";

import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { Belt } from "~/lib/types";

import createAlumnAction from "~/server/actions/alumnos/create-action";
import ErrorMessage from "~/components/error-message";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  belts?: Belt[];
};

export default function CreateAlumnForm({ belts }: Props) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  async function onSubmit(values: FieldValues) {
    startTransition(async () => {
      const newAlumn = {
        fullname: values.fullname.trim() as string,
        birthday: values.birthday as string,
        phoneNumber: values?.phoneNumber?.trim() as string,
        tutor: values?.tutor?.trim() as string,
        idBelt: Number(values.idBelt),
      };

      const response = await createAlumnAction(newAlumn);
      if (response.success) {
        reset();
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <label
            className="leading-1 mt-1 block text-sm font-medium text-black/80"
            htmlFor="fullname"
          >
            Nombre completo
          </label>
          <input
            id="fullname"
            type="text"
            autoComplete="off"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            placeholder="ej: Luis Antonio ..."
            {...register("fullname", {
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
          {errors.fullname && (
            <ErrorMessage>{String(errors.fullname.message)}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="leading-1 mt-1 block text-sm font-medium text-black/80"
            htmlFor="birthday"
          >
            Fecha de nac.
          </label>
          <input
            id="birthday"
            type="date"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            {...register("birthday", {
              required: {
                value: true,
                message: "*Fecha de nac. es requerida.",
              },
            })}
          />
          {errors.birthday && (
            <ErrorMessage>{String(errors.birthday.message)}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="idBelt">Cinturón</label>
          <select
            id="idBelt"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            {...register("idBelt", {
              required: {
                value: true,
                message: "*El cinturón es requerido.",
              },
              minLength: {
                value: 1,
                message: "*Debe seleccionar un cinturón.",
              },
            })}
          >
            {Array.isArray(belts) &&
              belts.map((belt) => {
                return (
                  <option
                    className="flex items-center gap-1 text-sm text-black/80"
                    key={belt.id}
                    value={belt.id}
                  >
                    {belt.name}
                  </option>
                );
              })}
          </select>
          {errors.idBelt && (
            <ErrorMessage>{String(errors.idBelt.message)}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="leading-1 mt-1 block text-sm font-medium text-black/80"
            htmlFor="phoneNumber"
          >
            Núm. Teléfono
          </label>
          <input
            id="phoneNumber"
            type="text"
            autoComplete="off"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            placeholder="ej: 376-430329"
            {...register("phoneNumber", {
              maxLength: {
                value: 99,
                message: "*No debe superar los 99 caracteres.",
              },
            })}
          />
          {errors.phoneNumber && (
            <ErrorMessage>{String(errors.phoneNumber.message)}</ErrorMessage>
          )}
        </div>

        <div className="mb-1 flex flex-col gap-1">
          <label
            className="leading-1 mt-1 block text-sm font-medium text-black/80"
            htmlFor="tutor"
          >
            Nombre de un tutor
          </label>
          <input
            id="tutor"
            type="text"
            autoComplete="off"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            placeholder="ej: Carlos Alvarez"
            {...register("tutor", {
              maxLength: {
                value: 254,
                message: "*No debe superar los 254 caracteres.",
              },
            })}
          />
          {errors.tutor && (
            <ErrorMessage>{String(errors.tutor.message)}</ErrorMessage>
          )}
        </div>

        <div>
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
    </>
  );
}
