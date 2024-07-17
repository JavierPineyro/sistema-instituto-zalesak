import { string } from "zod";
import { signInSchema } from "./signin.schema";

export const loginSchema = signInSchema.extend({
  name: string({ required_error: "Name is required" }).min(1, "Name is required")
});