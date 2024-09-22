"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import ErrorMessage from "~/components/error-message";
import { getMonthsToPay, getTotal, hasRecharge } from "~/lib/utils";

type Props = {
  id: number;
  amount: number | undefined;
  alumn:
    | {
        fullname: string;
        pagos: {
          month: string;
        }[];
      }
    | undefined;
};

export default function PayForm({ id, alumn, amount = 15000 }: Props) {
  const currentDate = new Date();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const monthsToPay = getMonthsToPay(alumn?.pagos);

  function onSubmit(data: FieldValues) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const recharge = hasRecharge(data.month);
    const percentage = recharge ? 10 : 0;
    const total = getTotal(amount!, percentage);

    console.log("data total", {
      recharge,
      percentage,
      total,
      amount,
      nameClient: alumn?.fullname,
      idAlumn: id,
      date: currentDate,
      concept: data.concept,
      writtenAmount: data.writtenAmount,
      month: data.month,
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="concept">Concepto del pago</label>
          <input
            type="text"
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
            })}
          />
          {errors.concept && (
            <ErrorMessage>{String(errors.concept.message)}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="month">Mes</label>
          <select
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
            type="text"
            placeholder="ej: Quince mil..."
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
          className="border-0 bg-blue-500 px-2 py-1 text-lg text-white transition-colors hover:bg-blue-400"
          type="submit"
          value="Pagar"
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
