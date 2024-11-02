import { number, object, string } from "zod";

export const CreateEquipmentSchema = object({
  name: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(254, "Máximo 254 caracteres"),
  quantity: number({
    required_error: "La cantidad es obligatoria",
  }),
  observation: string({ required_error: "El nombre es obligatorio" })
    .max(254, "Máximo 254 caracteres")
    .nullable(),
});

export const UpdateEquipmentSchema = object({
  id: number({ required_error: "El id es obligatorio" }).positive(
    "El id debe ser mayor a cero",
  ),
  name: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(254, "Máximo 254 caracteres"),
  quantity: number({
    required_error: "La cantidad es obligatoria",
  }),
  observation: string({ required_error: "El nombre es obligatorio" })
    .max(254, "Máximo 254 caracteres")
    .nullable(),
});
