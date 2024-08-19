import { boolean, number, object, string, z } from "zod";

// Por ahora uso los tipos asi por tiempo pero despues lo mejoro todo lo juro ajja

export const alumnSchema = object({
  id: number().optional(),
  fullname: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(255, "Máximo 255 caracteres"),
  birthday: string({ required_error: "Fecha de nacimiento obligatorio" }),
  idBelt: number({ required_error: "El cinturón es requerido" }),
  phoneNumber: string().max(100, "Máximo 100 caracteres").optional(),
  tutor: string().max(255, "Máximo 255 caracteres").optional(),
  active: boolean({ required_error: "El estatus es obligatorio" }),
  cinturon: object({
    id: number(),
    name: string(),
  }),
});

// export type Alumn = z.infer<typeof alumnSchema>;
export type Alumn = {
  id: number;
  fullname: string;
  birthday: string;
  idBelt: number;
  phoneNumber: string | null;
  tutor: string | null;
  active: boolean;
  cinturon: {
    id: number;
    name: string;
  };
};

export const AlumnCreateSchema = object({
  fullname: string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es requerido")
    .max(255, "Máximo 255 caracteres"),
  birthday: string({ required_error: "Fecha de nacimiento obligatorio" }),
  idBelt: string({ required_error: "El cinturón es requerido" }),
  phoneNumber: string().max(100, "Máximo 100 caracteres").optional(),
  tutor: string().max(255, "Máximo 255 caracteres").optional(),
});

export const AlumnUpdateSchema = z
  .object({
    id: z.number(),
    // active: z.boolean(),
  })
  .merge(AlumnCreateSchema);
