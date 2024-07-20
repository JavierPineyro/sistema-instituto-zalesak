import { object, string } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es obligatorio")
    .email("El email no es válido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña no es válida")
    .min(6, "La contraseña debe tener más de 6 caracteres")
    .max(32, "La contrasña debe de tener menos de 32 caracteres"),
})