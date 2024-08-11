import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import CreateAlumnForm from "../forms/create-alumn-form";
import { service } from "~/server/services";

type Props = {
  children: React.ReactNode // As button text we use the children
}

export default async function CreateAlumnModal({ children }: Props) {

  const belts = await service.cinturones.list()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Modal es para crear un nuevo alumno" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo alumno</DialogTitle>
        </DialogHeader>
        <CreateAlumnForm belts={belts} />
      </DialogContent>
    </Dialog>
  )
}