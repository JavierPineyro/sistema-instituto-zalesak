import { number, object, string } from "zod";

export const PayentCreateSchema = object(
  {
    date: string(),
    month: string()
      .min(1, "El mes no puede estar vacio")
      .max(50, "El mes debe tener entre 1 y 50 caracteres"),
    writtenAmount: string()
      .min(1)
      .max(255, "El monto escrito debe tener entre 1 y 255 caracteres"),
    idRecieve: number().nonnegative(),
    idAlumn: number().nonnegative(),
  },
  {
    required_error: "Todos los campos son obligatorios",
  },
);
