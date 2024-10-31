"use client";

import { Belt } from "~/lib/types";
import updateAlumnAction from "~/server/actions/alumnos/update-action";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { cn } from "~/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import ErrorMessage from "~/components/error-message";

type Props = {
  belts: Belt[] | null;
  alumn: {
    id: number;
    active: boolean;
    fullname: string;
    birthday: string;
    idBelt: number;
    phoneNumber: string | null;
    tutor: string | null;
  };
};

export default function UpdateAlumnForm({ belts, alumn }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: alumn.fullname,
      birthday: alumn.birthday,
      phoneNumber: alumn.phoneNumber ?? "",
      tutor: alumn.tutor ?? "",
      idBelt: alumn.idBelt,
    },
  });

  async function onSubmit(data: FieldValues) {
    const updateAlumn = {
      id: alumn.id,
      fullname: data.fullname.trim() as string,
      birthday: data.birthday as string,
      phoneNumber: data.phoneNumber?.trim() as string,
      tutor: data.tutor?.trim() as string,
      idBelt: Number(data.idBelt),
    };
    startTransition(async () => {
      const response = await updateAlumnAction(updateAlumn);
      if (response.success) {
        toast.success(response.message);
        router.push(`/admin/alumnos/${alumn.id}`);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label
            className="leading-1 mt-1 block text-sm font-medium text-black/80"
            htmlFor="fullname"
          >
            Nombre Completo
          </label>
          <input
            id="fullname"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            type="text"
            autoComplete="off"
            {...register("fullname", {
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
          <label
            className="leading-1 mt-1 block text-sm font-medium text-black/80"
            htmlFor="idBelt"
          >
            Cinturón
          </label>
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

        <Button
          disabled={isPending}
          type="submit"
          className={cn(
            "flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
          )}
        >
          Guardar
        </Button>
      </form>
    </>
  );
}
