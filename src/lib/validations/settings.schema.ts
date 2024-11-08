import { number, object, string, z } from "zod";

export const CuotaCreateSchema = object({
  price: number({ required_error: "El precio es obligatorio" }).positive(
    "El total debe ser mayor a 0",
  ),
});

export const CuotaUpdateSchema = object({
  id: number({ required_error: "El id es obligatorio" }).positive(
    "El id del pedido debe ser mayor a 0",
  ),
  name: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(254, "Máximo 254 caracteres"),
  price: number({ required_error: "El precio es obligatorio" }).positive(
    "El total debe ser mayor a 0",
  ),
  updatedAt: z.date({ required_error: "La fecha es obligatoria" }),
});

export const BeltCreateSchema = object({
  name: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: string().nullable(),
});

export const BeltUpdateSchema = object({
  id: number({ required_error: "El id es obligatorio" }).positive(
    "El id  debe ser mayor a 0",
  ),
  name: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: string().nullable(),
});
