import { columns } from "~/components/pagos/tables/columns";
import { DataTable } from "~/components/pagos/tables/data-table";
import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};
export default async function PagosPage({ params }: Props) {
  //const payments = await service.pagos.getByAlumnId(Number(params.id));
  const paymentMock = [
    {
      id: 1,
      idAlumn: 1,
      idRecieve: 1,
      date: "2024-09-04",
      month: "Septiembre",
      recibo: {
        nameClient: "Juan Perez",
        concept: "Pago de cuota del mes de Septiembre",
        total: 12000,
      },
    },
    {
      id: 2,
      idAlumn: 1,
      idRecieve: 2,
      date: "2024-10-08",
      month: "Octubre",
      recibo: {
        nameClient: "Juan Perez",
        concept: "Pago de cuota del mes de Octubre",
        total: 12000,
      },
    },
    {
      id: 3,
      idAlumn: 1,
      idRecieve: 3,
      date: "2024-10-08",
      month: "Noviembre",
      recibo: {
        nameClient: "Juan Perez",
        concept: "Pago de cuota del mes de Noviembre",
        total: 12000,
      },
    },
  ];

  return (
    <section className="px-5">
      <header className="mb-5 flex justify-between">
        <h2 className="text-pretty text-xl font-semibold">Cuotas pagadas</h2>
      </header>
      <DataTable data={paymentMock} columns={columns} />
    </section>
  );
}
