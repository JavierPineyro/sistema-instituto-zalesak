import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CreateEquipmentForm from "../forms/create-form";

export default async function CreateEquipmentModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crear equipamiento</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Modal es para crear un nuevos productos"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Agregar nuevo equipamiento</DialogTitle>
        </DialogHeader>
        <CreateEquipmentForm />
      </DialogContent>
    </Dialog>
  );
}
