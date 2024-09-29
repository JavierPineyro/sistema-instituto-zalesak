import PayForm from "~/components/pagos/forms/pay-form";
import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};

export default async function PayPage({ params }: Props) {
  const amount = await service.precioServicio.getAmount();
  if (!amount) {
    throw new Error("No se encontró el precio de la cuota en PayPage");
  }

  const { id } = params;
  const currentDate = new Date();
  const alumn = await service.alumnos.getAlumnAndPays(
    Number(id),
    currentDate.getFullYear(),
  );

  if (!alumn) {
    throw new Error("No se encontró el alumno de la cuota en PayPage");
  }

  const date = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "full",
  }).format(currentDate);

  return (
    <section className="px-5">
      <header className="flex justify-between">
        <h2 className="text-pretty text-xl font-semibold">Pagar cuota</h2>
        <h4 className="text-pretty text-lg">{date}</h4>
      </header>
      <div className="mx-auto flex items-center justify-center">
        <PayForm id={Number(id)} alumn={alumn} amount={amount.price} />
      </div>
    </section>
  );
}
