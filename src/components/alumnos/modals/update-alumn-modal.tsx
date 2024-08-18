import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { service } from "~/server/services";
import UpdateAlumnForm from "~/components/alumnos/forms/update-alumn-form"
import { Belt, UpdateAlumn } from "~/lib/types";
import { Button } from "~/components/ui/button";

type Props = {
  alumn: UpdateAlumn
}

export default async function UpdateAlumnModal({ alumn }: Props) {
  const belts = await service.cinturones.list()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>Editar</span>
      </DialogTrigger>
      <DialogContent aria-describedby="Modal es para actualizar el alumno" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar alumno</DialogTitle>
        </DialogHeader>
        <UpdateAlumnForm alumn={alumn} belts={belts} />
      </DialogContent>
    </Dialog>
  )
}