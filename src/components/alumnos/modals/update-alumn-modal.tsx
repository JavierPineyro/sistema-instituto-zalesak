import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { service } from "~/server/services";
import UpdateAlumnForm from "~/components/alumnos/forms/update-alumn-form"
import { UpdateAlumn } from "~/lib/types";

type Props = {
  children: React.ReactNode // As button text we use the children
  alumn: UpdateAlumn
}

export default async function UpdateAlumnModal({ children, alumn }: Props) {

  const belts = await service.cinturones.list()

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
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