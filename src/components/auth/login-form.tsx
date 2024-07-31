"use client"

import loginAction from "~/server/actions/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "~/lib/validations/signin.schema"
import { z } from "zod"
import { cn } from "~/lib/utils"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import TextMessage from "~/components/text-gray-message"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/form"
import { AuthError } from "next-auth"
import { ValidationMessage } from "~/lib/types"


export default function LoginForm() {

  const [error, setError] = useState<string | undefined | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null)
    startTransition(async () => {
      try {
        const response = await loginAction(values)
        if (response.success) {
          setError(null)
          router.push("/admin")
        }
        else {
          setError(ValidationMessage.WRONG_EMAIL_OR_PASSWORD)
        }

      } catch (err) {
        if (err instanceof AuthError) {
          switch (err.type) {
            case "CredentialsSignin":
              setError(ValidationMessage.WRONG_EMAIL_OR_PASSWORD)
            default:
              setError(ValidationMessage.UNEXPECTED_ERROR)
          }
        }
        else {
          setError(ValidationMessage.UNEXPECTED_ERROR)
        }
      }
    })

  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src="/itf-itf-logo.png" alt="Logo de la federación internacional de taekwondo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión con tu cuenta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className={cn("block text-sm font-medium leading-6 text-gray-900")}>Email</FormLabel>
                  <FormControl>
                    <Input id="email" className={cn("block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6")} type="email" placeholder="email@email.com" {...field} />
                  </FormControl>
                  <div className="h-3 items-center">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className={cn("block text-sm font-medium leading-6 text-gray-900")}>Contraseña</FormLabel>
                  <FormControl>
                    <Input id="password" className={cn("block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6")} type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <div className="h-3 items-center">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div>
              <Button disabled={isPending} className={cn("flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600")} type="submit">Iniciar Sesión</Button>
            </div>
          </form>
        </Form>
        <div>
          {error !== null
            ? <p className="text-red-500 mt-8 text-center text-sm">{error}</p>
            : <TextMessage isGray={true}>Asegúrate de completar todos los campos</TextMessage>
          }
        </div>
      </div>
    </div>
  )
}

{/* <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src="/itf-itf-logo.png" alt="Logo de la federación internacional de taekwondo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión con tu cuenta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={loginAction}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" required className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" required className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar Sesión</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Asegúrate de completar todos los campos
        </p>
      </div>
    </div> */}