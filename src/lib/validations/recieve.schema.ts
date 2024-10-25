import { boolean, number, object, string } from "zod";

export const RecieveCreateSchema = object({
  date: string({ required_error: "El fecha es obligatoria" }),
  idAlumn: number({
    required_error: "El id del alumno es obligatorio",
  }).nonnegative({ message: "El id del alumno debe ser un número positivo" }),
  amount: number({ required_error: "El monto es obligatorio" }).positive({
    message: "El monto debe ser un valor positivo",
  }),
  writtenAmount: string({
    required_error: "El monto escrito es obligatorio",
  }).min(1, "El monto escrito debe tener al menos 1 caracter"),
  nameClient: string({ required_error: "El nombre del cliente es obligatorio" })
    .min(1, "El nombre del cliente no puede estar vacio")
    .max(254, "El nombre del cliente debe tener entre 1 y 254 caracteres"),
  concept: string({ required_error: "El concepto es obligatorio" })
    .min(1, "El concepto del pago no puede estar vacio")
    .max(254, "El concepto del pago debe tener entre 1 y 254 caracteres"),
  recharge: boolean({ required_error: "El recargo es obligatorio" }),
  total: number({ required_error: "El total es obligatorio" }).positive({
    message: "El total debe ser un valor positivo",
  }),
});
