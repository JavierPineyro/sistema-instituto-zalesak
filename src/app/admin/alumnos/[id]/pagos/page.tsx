import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};
export default async function PagosPage({ params }: Props) {
  const payments = await service.pagos.getByAlumnId(Number(params.id));
  return (
    <section className="px-5">
      <header className="mb-5 flex justify-between">
        <h2 className="text-pretty text-xl font-semibold">Tabla de pagos</h2>
      </header>
      <div></div>
    </section>
  );
}
