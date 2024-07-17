"use server"

import { signIn } from "auth"
import { ServiceProvider } from "~/lib/types"

export default async function loginAction(formData: FormData){
  let err = null
  try {
    await signIn(ServiceProvider.CREDENTIALS, formData)
  } catch (error) {
    
    console.log("Error throws in login action --->", error)

    if (error instanceof Error) {
      err = error.message
    }
    else {
      err = "Error inesperado"
    }
  } finally{
    console.log("Error that returned login action --->", err)
    return err
  }
}