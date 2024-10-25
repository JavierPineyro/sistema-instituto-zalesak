"use client";

import { useRouter } from "next/navigation";
import { cn, formatDateForDB, parseTotalToLocale } from "~/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import ErrorMessage from "~/components/error-message";
import { useForm, FieldValues } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";
import createRecieveOfOrderAction from "~/server/actions/pedidos/create-recieve-action";

type Props = {
  open: boolean;
  onClose: () => void;
  alumn: { id: number; fullname: string };
  total: number;
  nameProduct: string;
  quantity: number;
};
export default function OrderRecievedModal(props: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: FieldValues) {
    const date = new Date();
    const dateToString = formatDateForDB(date);

    const newRecieve = {
      concept: data.concept.trim(),
      writtenAmount: data.writtenAmount.trim(),
      date: dateToString,
      nameClient: props.alumn.fullname,
      idAlumn: props.alumn.id,
      amount: props.total,
      recharge: false,
      total: props.total,
    };

    startTransition(async () => {
      const response = await createRecieveOfOrderAction(
        newRecieve,
        props.alumn.id,
      );
      if (response.success) {
        router.push(`/admin/alumnos/${props.alumn.id}`);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <AlertDialog open={props.open} onOpenChange={props.onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Recibo de pedido</AlertDialogTitle>
            <small className="flex gap-1 text-sm text-gray-500">
              {props.nameProduct} - cantidad: {props.quantity} - total:{" "}
              {parseTotalToLocale(props.total)}
            </small>
          </AlertDialogHeader>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="concept">Concepto del pago</label>
              <input
                id="concept"
                type="text"
                className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
                autoComplete="off"
                placeholder="Pago de un cinturon..."
                {...register("concept", {
                  min: {
                    value: 1,
                    message: "*Debe ser mínimo 1 caracter.",
                  },
                  required: "*El concepto es requerido.",
                })}
              />
              {errors.concept && (
                <ErrorMessage>{String(errors.concept.message)}</ErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="writtenAmount">Monto escrito</label>
              <input
                id="writtenAmount"
                className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
                type="text"
                autoComplete="off"
                {...register("writtenAmount", {
                  min: {
                    value: 1,
                    message: "*Debe ser mínimo 1 caracter.",
                  },
                  required: "*El monto escrito es requerido.",
                })}
              />
              {errors.writtenAmount && (
                <ErrorMessage>
                  {String(errors.writtenAmount.message)}
                </ErrorMessage>
              )}
            </div>

            <AlertDialogFooter>
              {errors ? null : (
                <AlertDialogAction
                  className={cn(
                    "w-full rounded-md border-0 bg-black px-2 py-1 text-lg text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-800",
                  )}
                  type="submit"
                  disabled={isPending}
                >
                  Guardar
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
