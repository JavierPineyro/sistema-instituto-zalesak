"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import { Product } from "~/lib/types";
type Props = {
  product: Product;
};

export default function EditProductForm({ product }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      publicPrice: product.publicPrice,
      teacherPrice: product.teacherPrice,
      active: product.active,
    },
  });

  async function onSubmit(data: FieldValues) {
    const updatedProduct = {
      id: Number(product.id),
      name: data.name.trim(),
      publicPrice: Number(data.publicPrice),
      teacherPrice: Number(data.teacherPrice),
      active: data.active,
    };
    /* startTransition(async () => {
      const response = await updateProductAction(updateAlumn);
      if (response.success) {
        router.push(`/admin/productos`);
      } else {
        toast.error(response.message);
      }
      });*/
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "*Nombre es requerido.",
            },
            minLength: {
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
        <label htmlFor="publicPrice">Precio Público</label>
        <input
          id="publicPrice"
          className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
          type="number"
          step="0.01"
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
        <label htmlFor="teacherPrice">Precio Instructor</label>
        <input
          id="teacherPrice"
          className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
          type="number"
          step="0.01"
          {...register("teacherPrice", {
            min: {
              value: 1,
              message: "*El precio debe ser mayor a 1.",
            },
            required: "*El precio es requerido.",
          })}
        />
        {errors.teacherPrice && (
          <ErrorMessage>{String(errors.teacherPrice.message)}</ErrorMessage>
        )}
      </div>
      <div className="flex gap-2">
        <label htmlFor="active">¿Está activo?</label>
        <input
          id="active"
          className="w-6 rounded-md border-2 border-gray-400 px-3 py-2 accent-[#211e1e]"
          type="checkbox"
          {...register("active")}
        />
      </div>
      <button
        className="w-full rounded-md border-0 bg-black px-2 py-1 text-lg text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-800"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Cargando producto..." : "Actualizar"}
      </button>
    </form>
  );
}
