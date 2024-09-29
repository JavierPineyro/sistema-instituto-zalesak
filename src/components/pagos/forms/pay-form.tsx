"use client";

import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "~/components/error-message";
import { getMonthsToPay, getTotal, hasRecharge } from "~/lib/utils";
import payAction from "~/server/actions/pagos/pay-action";

type Props = {
  id: number;
  amount: number;
  alumn:
    | {
        fullname: string;
        active: boolean;
        dateAdmission: string;
        pagos: {
          month: string;
        }[];
      }
    | undefined;
};

export default function PayForm({ id, alumn, amount }: Props) {
  if (!alumn) throw new Error("No se encontró el alumno - Formulario Pago");

  const currentDate = new Date();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const monthsToPay = getMonthsToPay(alumn.pagos, alumn.dateAdmission);

  async function onSubmit(data: FieldValues) {
    startTransition(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const recharge = hasRecharge(data.month);
      const percentage = recharge ? 10 : 0;
      const total = getTotal(amount, percentage);
      const newPayment = {
        recharge,
        percentage,
        total,
        amount,
        nameClient: alumn?.fullname ?? "",
        idAlumn: id,
        date: currentDate,
        concept: data.concept as string,
        writtenAmount: data.writtenAmount as string,
        month: data.month as string,
      };

      const response = await payAction(newPayment);
      if (response.success) {
        reset();
        toast.success(response.message);
      } else {
        console.log(response);
        toast.error(response.message);
      }
    });
  }

  if (!alumn) {
    return <div className="text-center">No se encontró el alumno</div>;
  }

  if (!alumn.active) {
    return <div className="text-center">El alumno no está activo</div>;
  }

  return (
    <>
      <form
        className="item-center flex w-[500px] flex-col justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="concept">Concepto del pago</label>
          <input
            id="concept"
            type="text"
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            placeholder="ej: Pago de cuota..."
            {...register("concept", {
              required: {
                value: true,
                message: "*Concepto del pago es requerido.",
              },
              minLength: {
                value: 1,
                message: "*Debes completar en concepto del pago.",
              },
              maxLength: {
                value: 254,
                message: "*No debe superar los 254 caracteres.",
              },
            })}
          />
          {errors.concept && (
            <ErrorMessage>{String(errors.concept.message)}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="month">Mes</label>
          <select
            id="month"
            {...register("month", {
              required: {
                value: true,
                message: "*Mes es requerido.",
              },
            })}
          >
            {monthsToPay.map((month, i) => (
              <option key={i} value={month}>
                {month}
              </option>
            ))}
          </select>
          {errors.month && (
            <ErrorMessage>{String(errors.month.message)}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="writtenAmount">Monto escrito</label>
          <input
            id="writtenAmount"
            type="text"
            placeholder="ej: Quince mil..."
            className="w-full rounded-md border-2 border-gray-400 px-3 py-2"
            {...register("writtenAmount", {
              minLength: {
                value: 1,
                message: "*Debe escribir el monto del pago",
              },
              required: "*El monto escrito es requerido.",
            })}
          />
          {errors.writtenAmount && (
            <ErrorMessage>{String(errors.writtenAmount.message)}</ErrorMessage>
          )}
        </div>
        <input
          disabled={isPending}
          className="rounded-md border-0 bg-blue-500 px-2 py-1 text-lg text-white transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800"
          type="submit"
          value={isPending ? "Creando pago..." : "Crear pago"}
        />
      </form>
    </>
  );
}

/*
  amount, (automatico)
  date,(automatico)
  idAlumn, (automatico)
  recharge, (automatico)
  total, (automatico)
  nameClient, (Automatico)

  concept, (manual)
  writtenAmount, (manual)
  month, (manual)
*/
