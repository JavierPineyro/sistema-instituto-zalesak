import PdfRecieve from "~/components/pdf/PdfRecieve";
import { service } from "~/server/services";
import { Recieve } from "~/lib/types";
import PDF from "~/components/pdf/PDF";

type Props = {
  params: {
    idrecieve: string;
  };
};

export default async function ReciboPage({ params }: Props) {
  const recieve = await service.recibos.getById(Number(params.idrecieve));

  if (!recieve) {
    return <div className="text-center ">Recibo no encontrado</div>;
  }
  const fileName = `recibo-${recieve.id}.pdf`;
  return (
    <div className="flex flex-col justify-center gap-2 text-center">
      <header>
        <h1 className="text-3xl font-bold">Recibo de pago</h1>
      </header>
      <PdfRecieve recieve={recieve} />
    </div>
  );
}
