import { string } from "zod";
import { loginSchema } from "./signin.schema";

export const registerSchema = loginSchema.extend({
  name: string({ required_error: "El nombre es obligatorio" }).min(1, "El nombre es requerido")
});