"use server"

import { db } from "~/server/db";
import { users } from "../db/schema";
import { registerSchema } from "~/lib/validations/register.schema";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function register(formData: FormData) {
  let err = null
  const n = formData.get("name") as string
  const e = formData.get("email") as string
  const p = formData.get("password") as string
  try {
    // parse data
    const data = registerSchema.parse({name:n, email: e,password: p})

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
    console.log("Error that returned at Register Action --->",err)
    return err
  }
  revalidatePath("/")
  redirect("/")
}