import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import CreateAlumnForm from "../forms/create-alumn-form";

type Props = {
  children: React.ReactNode // As button text we use the children
}

export default function CreateAlumnModal({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Modal es para crear un nuevo alumno" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo alumno</DialogTitle>
        </DialogHeader>
        <CreateAlumnForm />
      </DialogContent>
    </Dialog>
  )
}