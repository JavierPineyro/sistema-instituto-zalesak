"user server"

import { db } from "~/server/db";
import { users } from "../db/schema";
import { loginSchema } from "~/lib/validations/login.schema";
import { ZodError } from "zod";

export default async function register(formData: FormData) {
  let err = null

  try {
    const {name, email, password} = loginSchema.parse(formData)
    await db.insert(users).values({name, email, password})
  } catch (error) {
    console.log("Error that throws at Register Actions --->",error)
    if (error instanceof ZodError) {
      err = error.flatten()
    }
    else{
      err = "Error inesperado al intentar registrar un usuario"
    }
  } finally{
    console.log("Error that returned at Register Action --->",err)

    return err
  }
}