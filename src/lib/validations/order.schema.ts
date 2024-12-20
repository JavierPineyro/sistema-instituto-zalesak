import { number, object, string, z } from "zod";

export const OrderUpdateSchema = object({
  id: number({ required_error: "El id es obligatorio" }).positive(
    "El id del pedido debe ser mayor a 0",
  ),
  idProduct: number({ required_error: "El producto es obligatorio" }).positive(
    "El id del producto debe ser mayor a 0",
  ),
  quantity: number({
    required_error: "La cantidad es obligatoria",
  }).positive("La cantidad debe ser mayor a 0"),
  idAlumn: number({ required_error: "El alumno es obligatorio" }).positive(
    "El id del alumno debe ser mayor a 0",
  ),
  state: z.enum(["pendiente", "entregado", "cancelado"], {
    required_error: "El estado es obligatorio",
    invalid_type_error:
      "El estado debe ser un valor válido (pendiente, entregado, cancelado)",
  }),
  total: number({ required_error: "El total es obligatorio" }).positive(
    "El total debe ser mayor a 0",
  ),
});

export const OrderCreateSchema = object({
  idProduct: number({
    required_error: "El id del producto es obligatorio",
  }).positive("El id del producto debe ser mayor a 0"),
  quantity: number({
    required_error: "La cantidad es obligatoria",
  }).positive("La cantidad debe ser mayor a 0"),
  idAlumn: number({
    required_error: "El id del alumno es obligatorio",
  }).positive("El id del alumno debe ser mayor a 0"),
  state: z.enum(["pendiente", "entregado", "cancelado"], {
    required_error: "El estado es obligatorio",
    invalid_type_error:
      "El estado debe ser un valor válido (pendiente, entregado, cancelado)",
  }),
  total: number({ required_error: "El total es obligatorio" }).positive(
    "El total debe ser mayor a 0",
  ),
  concept: string({ required_error: "El concepto es obligatorio" })
    .min(1, "El concepto es requerido")
    .max(254, "Máximo 254 caracteres"),
  writtenAmount: string({ required_error: "El monto escrito es obligatorio" })
    .min(1, "El monto escrito es requerido")
    .max(254, "Máximo 254 caracteres"),
  date: string({ required_error: "La fecha es obligatoria" }),
  nameClient: string({ required_error: "El nombre del cliente es obligatorio" })
    .min(1, "El nombre del cliente es requerido")
    .max(254, "Máximo 254 caracteres"),
});
