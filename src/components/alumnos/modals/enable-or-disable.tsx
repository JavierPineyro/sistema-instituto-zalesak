"use client"

import { useState, useTransition } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"
import activeAlumnAction from "~/server/actions/alumnos/active-action"

type Props = {
  id: number,
  active: boolean
}
export default function EnableOrDisable({ id, active }: Props) {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [isPending, startTransition] = useTransition()
  const textTrigger = active ? "Desactivar" : "Activar"
  const changeActiveAlumnAction = activeAlumnAction.bind(null, { id, active })

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const response = await changeActiveAlumnAction(formData)
      if (response.success) {
        setIsOpen(false)
        window.location.reload()
      } else {
        alert(response.message)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button className={cn("w-32 bg-blue-600 hover:bg-blue-500 transition-colors")}>{textTrigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Vas a ${textTrigger} al alumno`}</DialogTitle>
          <DialogDescription className={cn("text-gray-700")}>
            Has click en CONFIRMAR para guardar los cambios, espera hasta que la modal se cierre automáticamente.
          </DialogDescription>
        </DialogHeader>
        <form action={(handleSubmit)}>
          <input onChange={() => console.log("No deberias estar viendo esto")} className="hidden" name="id" type="number" defaultValue={id} />
          <input onChange={() => console.log("No deberias estar viendo esto")} className="hidden" name="active" type="text" defaultValue={`${active}`} />
          <DialogFooter className="flex w-full justify-between items-center">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}