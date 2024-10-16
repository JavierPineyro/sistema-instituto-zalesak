"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { service } from "~/server/services";

export default function DeleteProductModal({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: number) => () => {
    startTransition(async () => {
      const [result] = await service.precios.delete(id);

      if (result && result.id) {
        toast.success("Producto eliminado correctamente");
      } else {
        toast.error("No se pudo eliminar el producto");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Eliminar</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de que quieres eliminar este producto?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete(id)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
