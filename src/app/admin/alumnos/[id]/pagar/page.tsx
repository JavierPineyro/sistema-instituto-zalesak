import PayForm from "~/components/pagos/forms/pay-form";
import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};

export default async function PayPage({ params }: Props) {
  const amount = await service.precioServicio.getAmount();
  const { id } = params;
  const currentDate = new Date();
  const alumn = await service.alumnos.getAlumnAndPays(
    Number(id),
    currentDate.getFullYear(),
  );
  console.log("ALUMN SERVER", alumn);
  const date = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "full",
  }).format(currentDate);

  return (
    <section className="px-5">
      <header className="flex justify-between">
        <h2 className="text-pretty text-xl font-semibold">Pagar cuota</h2>
        <h4 className="text-pretty text-lg">{date}</h4>
      </header>
      <div>
        <PayForm id={Number(id)} alumn={alumn} amount={amount?.price} />
      </div>
    </section>
  );
}
