"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useAlumn } from "../hooks/useAlumn";
import { getMonthsToPay, getTotal, hasRecharge } from "~/lib/utils";

type Props = {
  id: number;
  amount: number | undefined;
};

export default function PayForm({ id, amount }: Props) {
  const currentDate = new Date();
  const { alumn, isLoading } = useAlumn(id, currentDate);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const monthsToPay = getMonthsToPay(alumn?.pagos);

  function onSubmit(data: FieldValues) {
    const nameClient = alumn ? alumn.fullname : "No se ha encontrado";
    console.log("Formulario", data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const recharge = hasRecharge(data.month);
    const percentage = recharge ? 10 : 0;
    const total = getTotal(amount!, percentage);
    console.log("data total", {
      nameClient,
      recharge,
      percentage,
      total,
      amount,
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
        <div>
          <label htmlFor="concept">Concepto del pago</label>
          <input
            type="text"
            placeholder="ej: Pago de cuota..."
            {...register("concept", {
              required: "Concepto del pago es requerido.",
            })}
          />
          {errors.fullname && <span>{String(errors.fullname.message)}</span>}
        </div>
        <div>
          <label htmlFor="month">Mes</label>
          <select
            {...register("month", {
              required: "Mes es requerido",
            })}
          >
            {monthsToPay.map((month, i) => (
              <option key={i} value={month}>
                {month}
              </option>
            ))}
          </select>
          {errors.month && <span>{String(errors.month.message)}</span>}
        </div>
        <div>
          <label htmlFor="writtenAmount">Mes</label>
          <input
            type="text"
            placeholder="ej: Quince mil..."
            {...register("writtenAmount", {
              minLength: {
                value: 1,
                message: "Debe escribir el monto del pago",
              },
              required: "El monto en formato escrito es requerido.",
            })}
          />
          {errors.writtenAmount && (
            <span>{String(errors.writtenAmount.message)}</span>
          )}
        </div>
        <input type="submit">Pagar</input>
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
