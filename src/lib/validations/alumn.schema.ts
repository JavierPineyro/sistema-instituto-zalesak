import { boolean, date, number, object, string, z } from "zod";

export const alumnSchema = object({
  id: number().optional(),
  fullname: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(255, "Máximo 255 caracteres"),
  birthday: date({ required_error: "Fecha de nacimiento obligatorio" }),
  idBelt: number({ required_error: "El cinturón es requerido" }),
  cellphone: string().max(100, "Máximo 100 caracteres").optional(),
  tutor: string().max(255, "Máximo 255 caracteres").optional(),
  active: boolean({ required_error: "El estatus es obligatorio" }),
});

export type Alumn = z.infer<typeof alumnSchema>;
