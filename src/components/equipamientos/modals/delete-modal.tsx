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
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";
import deleteAction from "~/server/actions/equipamientos/delete-action";

export default function DeleteEquipmentModal({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: number) => () => {
    startTransition(async () => {
      const response = await deleteAction(id);

      if (response && response.success) {
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center rounded-md bg-red-100 px-2 py-1 text-red-600">
        Eliminar
        <TrashIcon className="ml-2 inline size-4 text-current" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de que quieres eliminar este equipo?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete(id)}>
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
