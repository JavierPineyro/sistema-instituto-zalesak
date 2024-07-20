"use server"

import { signIn } from "auth"
import { ServiceProvider } from "~/lib/types"

export default async function loginAction(formData: FormData){
  
    await signIn(ServiceProvider.CREDENTIALS, formData)
  
}