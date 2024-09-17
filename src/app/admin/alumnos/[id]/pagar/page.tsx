import PayForm from "~/components/pagos/forms/pay-form";
import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};
/*
  amount, (automatico)
  date,(automatico)
  idAlumn, (automatico)
  concept, (automatico)
  recharge, (automatico)
  total, (automatico)

  nameClient, (manual)
  writtenAmount, (manual)
  month, (manual)
*/

export default async function PayPage({ params }: Props) {
  const amount = await service.precioServicio.getAmount();
  const { id } = params;

  return (
    <section className="px-5">
      <header className="flex justify-between">
        <h2>Pagar cuota</h2>
        <h4>{new Date().toDateString()}</h4>
      </header>
      <div>
        <PayForm id={Number(id)} amount={amount?.price} />
      </div>
    </section>
  );
}
