import { boolean, date, number, object, string, z } from "zod";

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
export const FormDataPaymemntSchema = object({
  date: date(),
  writtenAmount: string().min(
    1,
    "El monto escrito debe tener al menos 1 caracter",
  ),
  idAlumn: number().nonnegative(),
  concept: string()
    .min(1, "El concepto del pago no puede estar vacio")
    .max(254, "El concepto del pago debe tener entre 1 y 254 caracteres"),
  recharge: boolean(),
  total: number().positive("El total debe ser un valor positivo"),
  amount: number().positive("El monto debe ser un valor positivo"),
  percentage: number(),
  nameClient: string()
    .min(1, "El nombre del cliente no puede estar vacio")
    .max(100, "El nombre del cliente debe tener entre 1 y 100 caracteres"),
  month: z.enum([
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]),
});
