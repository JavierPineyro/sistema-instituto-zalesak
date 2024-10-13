import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CreateProductForm from "../forms/create-poduct-form";

type Props = {
  children: React.ReactNode;
};

export default async function CreateProductoModal({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Modal es para crear un nuevos productos"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Agregar producto</DialogTitle>
        </DialogHeader>
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  );
}
