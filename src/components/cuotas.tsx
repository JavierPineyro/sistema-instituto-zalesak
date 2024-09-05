import { type Payment, CUOTA_STATUS as STATUS } from "~/lib/types";
import { months } from "~/lib/utils";
import Bar from "~/components/bar";

type Props = {
  cuotas: Payment[],
  admissionDate: string
}

export default function Cuotas({ cuotas = [], admissionDate }: Props) {

  return (
    <div className="flex gap-10 items-center">
      <div className="flex gap-[2px]">
        {
          months.map((month, index) => {

            const cuota = cuotas.find(cuota => cuota.month === month)
            if (!cuota) {
              return <Bar key={index} admissionDate={admissionDate} label={month} status={STATUS.VACIO} />
            }

            return <Bar key={cuota.id} admissionDate={admissionDate} label={month} status={STATUS.PAGADO} />
          })
        }
      </div>
      <div className="flex gap-4 border border-gray-500 rounded-md px-1 text-lg">
        <div className="flex items-center gap-1">
          <div className="rounded-full size-3 bg-green-500"></div>
          <span>Pagado</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="rounded-full size-3 bg-gray-300"></div>
          <span>Sin Pagar</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="rounded-full size-3 bg-orange-300"></div>
          <span>Atrasado</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="rounded-full size-3 bg-gray-400"></div>
          <span>No Disponible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="rounded-full size-3 border-2 border-red-600"></div>
          <span>Mes Actual</span>
        </div>
      </div>
    </div>
  );
}