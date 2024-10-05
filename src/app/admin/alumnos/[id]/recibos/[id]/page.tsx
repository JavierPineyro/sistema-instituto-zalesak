import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};

export default async function ReciboPage({ params }: Props) {
  const recieve = await service.recibos.getById(Number(params.id));

  if (!recieve) {
    return <div className="text-center ">Recibo no encontrado</div>;
  }

  return <div>Recibo {Number(params.id)}</div>;
}
