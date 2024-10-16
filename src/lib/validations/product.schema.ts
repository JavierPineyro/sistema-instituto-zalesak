import { number, object, string } from "zod";

export const ProductCreateSchema = object({
  name: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(255, "Máximo 255 caracteres"),
  publicPrice: number({
    required_error: "El precio publico es obligatorio",
  }).positive("El precio publico debe ser mayor a 0"),
  teacherPrice: number({
    required_error: "El precio del instructor es obligatorio",
  }).positive("El precio para el instructor debe ser mayor a 0"),
});
