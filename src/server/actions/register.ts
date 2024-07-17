"user server"

import { db } from "~/server/db";
import { users } from "../db/schema";
import { loginSchema } from "~/lib/validations/login.schema";
import { ZodError } from "zod";
import bcrypt from "bcryptjs"

export default async function register(formData: FormData) {
  let err = null

  try {
    // parse data
    const data = loginSchema.parse(formData)

    // hash password for safety
    const password = await bcrypt.hash(data.password, 10)
    const {name, email} = data

    // insert hashed pass and user into db
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