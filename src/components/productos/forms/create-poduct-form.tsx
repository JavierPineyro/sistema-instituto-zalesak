"use client";

import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import createProductAction from "~/server/actions/productos/create-action";

export default function CreateProductForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data: FieldValues) {
    const nameField = data.name.trim();
    const publicPriceField = Number(data.publicPrice);
    const teacherPriceField = Number(data.teacherPrice);
    startTransition(async () => {
      const newProduct = {
        name: nameField,
        publicPrice: publicPriceField,
        teacherPrice: teacherPriceField,
      };
      const response = await createProductAction(newProduct);
      if (response.success) {
        reset();
        toast.success(response.message);
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
            Nombre del producto
          </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            placeholder="ej: Cinturón blanco..."
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
          <label className="text-black/80 " htmlFor="publicPrice">
            Precio al Público
          </label>
          <input
            id="publicPrice"
            type="number"
            step="0.01"
            placeholder="ej: $20000.50..."
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            {...register("publicPrice", {
              min: {
                value: 1,
                message: "*El precio debe ser mayor a 1.",
              },
              required: "*El precio es requerido.",
            })}
          />
          {errors.publicPrice && (
            <ErrorMessage>{String(errors.publicPrice.message)}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black/80 " htmlFor="teacherPrice">
            Precio Instructor
          </label>
          <input
            id="teacherPrice"
            type="number"
            step="0.01"
            placeholder="ej: $20000.50..."
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            {...register("teacherPrice", {
              min: {
                value: 1,
                message: "*El precio debe ser mayor a cero.",
              },
              required: "*El precio es requerido.",
            })}
          />
          {errors.teacherPrice && (
            <ErrorMessage>{String(errors.teacherPrice.message)}</ErrorMessage>
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
