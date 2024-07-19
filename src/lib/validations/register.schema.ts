import { string } from "zod";
import { loginSchema } from "./signin.schema";

export const registerSchema = loginSchema.extend({
  name: string({ required_error: "Name is required" }).min(1, "Name is required")
});