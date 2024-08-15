"use client"

import { Belt, UpdateAlumn } from "~/lib/types"
import updateAlumnAction from "~/server/actions/alumnos/update-action"
import { AlumnUpdateSchema } from "~/lib/validations/alumn.schema"
import { z } from "zod"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/form"
import { cn } from "~/lib/utils"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { DialogClose, DialogFooter } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"

type Props = {
  belts: Belt[],
  alumn: UpdateAlumn
}

export default function UpdateAlumnForm({ belts, alumn }: Props) {

  const [error, setError] = useState<string | undefined | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof AlumnUpdateSchema>>({
    resolver: zodResolver(AlumnUpdateSchema),
    defaultValues: {
      fullname: alumn.fullname,
      birthday: alumn.birthday,
      phoneNumber: alumn.phoneNumber,
      active: alumn.active,
      tutor: alumn.tutor,
      idBelt: alumn.idBelt
    },
  })

  async function onSubmit(values: z.infer<typeof AlumnUpdateSchema>) {
    setError(null)
    const data = { ...values, id: alumn.id }
    startTransition(async () => {

      const response = await updateAlumnAction(data)
      if (response.success) {
        setError(null)
        window.location.reload()
      }
      else {
        setError(response.message)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fullname" className={cn("block text-sm font-medium leading-1 mt-2 text-gray-900")}>Nombre Completo</FormLabel>
                <FormControl>
                  <Input id="fullname" className={cn("block w-full rounded-md pl-2 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4")} type="text" placeholder="ej: Luis Antonio ..." {...field} />
                </FormControl>
                <div className="h-3 text-sm items-center">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="birthday" className={cn("block text-sm font-medium mt-2 leading-1 text-gray-900")}>Fecha de nac.</FormLabel>
                <FormControl>
                  <Input id="birthday" className={cn("block w-full rounded-md pl-2 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4")} type="date"  {...field} />
                </FormControl>
                <div className="h-3 text-sm items-center">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idBelt"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="idBelt" className={cn("block text-sm font-medium leading-1 mt-2 text-gray-900")}>Cinturón</FormLabel>
                <Select required onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Cinturón" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      Array.isArray(belts) &&
                      belts.map(belt => {
                        return <SelectItem key={belt.id} value={String(belt.id)}>{belt.name}</SelectItem>
                      })
                    }
                  </SelectContent>
                </Select>
                <div className="h-3 text-sm items-center">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phoneNumber" className={cn("block text-sm font-medium leading-1 mt-2 text-gray-900")}>Núm. Teléfono</FormLabel>
                <FormControl>
                  <Input id="phoneNumber" className={cn("block w-full rounded-md pl-2 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4")} type="text" placeholder="ej: 376-430329" {...field} />
                </FormControl>
                <div className="h-3 text-sm items-center">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tutor"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="tutor" className={cn("block text-sm font-medium leading-1 mt-2 text-gray-900")}>Nombre de un tutor</FormLabel>
                <FormControl>
                  <Input id="tutor" className={cn("block w-full rounded-md pl-2 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4")} type="text" placeholder="ej: Carlos Alvarez" {...field} />
                </FormControl>
                <div className="h-3 text-sm items-center">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="active" className={cn("text-sm font-medium leading-1 text-gray-90 mr-1")}>¿Está activo?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="h-3 text-sm items-center">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div>
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={isPending} className={cn("flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600")} type="submit">Guardar</Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
      <div>
        {
          error !== null && (
            <p className="text-red-500 mt-1 text-center text-sm">{error}</p>
          )
        }
      </div>
    </>
  )
}