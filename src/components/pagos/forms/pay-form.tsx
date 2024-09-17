"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAlumn } from "../hooks/useAlumn";

type Props = {
  id: number;
  amount: number | undefined;
};
export default function PayForm({ id, amount }: Props) {
  const currentDate = new Date();
  const { alumn, isLoading } = useAlumn(id, currentDate.getFullYear());
  // const {} = useForm({ resolver: zodResolver(schema) }); // algo asi

  return (
    <>
      <form>
        <input type="text" />
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
