"use server"

import { signIn } from "auth"
import { AuthError } from "next-auth"
import { z } from "zod"
import { ServiceProvider, ValidationMessage } from "~/lib/types"
import { loginSchema } from "~/lib/validations/signin.schema"

export default async function loginAction(formData: z.infer<typeof loginSchema>){
  try {
    await signIn(ServiceProvider.CREDENTIALS, {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })
    return {
        success: true,
        message: ValidationMessage.SUCCESSFUL_LOGIN,
    }
  } catch (error) {
    if(error instanceof AuthError){
      switch (error.type) {
        case "CredentialsSignin":
          return{
            success: false,
            message: ValidationMessage.WRONG_EMAIL_OR_PASSWORD,
        }
        default:
          return{
            success: false,
            message: ValidationMessage.UNEXPECTED_ERROR,
        }
      }
        
    }else{
        return{
            success: false,
            message: ValidationMessage.UNEXPECTED_ERROR
        }
    }
  }
  
}