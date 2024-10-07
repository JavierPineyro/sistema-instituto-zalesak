import PdfRecieve from "~/components/pdf/PdfRecieve";
import { service } from "~/server/services";
import { Recieve } from "~/lib/types";

type Props = {
  params: {
    idrecieve: string;
  };
};

export default async function ReciboPage({ params }: Props) {
  //const recieve = await service.recibos.getById(Number(params.id));
  const recieve: Recieve = {
    id: 1,
    date: "2024-06-21",
    amount: 12000,
    idAlumn: 1,
    writtenAmount: "Doce mil pesos",
    nameClient: "Juan Perez",
    concept: "Concepto de recibo",
    recharge: false,
    total: 100,
  };

  if (!recieve) {
    return <div className="text-center ">Recibo no encontrado</div>;
  }

  return (
    <div className="text-center">
      <header>
        <h1 className="text-3xl font-bold">Recibo de pago</h1>
        <button>Descargar</button>
        {/*componente cliente con PdfDownloadLink*/}
      </header>
      <PdfRecieve recieve={recieve} />
    </div>
  );
}
