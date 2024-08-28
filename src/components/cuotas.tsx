import { cn } from "~/lib/utils";

type Payment = {
  id: number
  month: string
  date: string
}

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
enum STATUS {
  PAGADO = "pagado",
  VACIO = "vacio",
  ATRASADO = "atrasado"
}

export default function Cuotas({ cuotas = [] }: { cuotas: Payment[] }) {

  return (
    <div className="flex gap-10 items-center">
      <div className="flex gap-[2px]">
        {
          months.map((month, index) => {
            const cuota = cuotas.find(cuota => cuota.month === month)
            if (!cuota) return <Bar key={index} label={month} status={STATUS.VACIO} />
            return <Bar key={cuota.id} label={month} status={STATUS.PAGADO} />
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

function Bar({ label, status }: { label: string, status: STATUS }) {

  const text = label.slice(0, 3)
  let title = ""

  // if is current month add a border to highlight
  const currentMonth = new Date().getMonth() + 1
  const monthNumber = months.indexOf(label) + 1

  const isPending = (currentMonth >= monthNumber) && status === STATUS.VACIO
  const isPaid = status === STATUS.PAGADO
  const isVoid = status === STATUS.VACIO
  const isNotAvailable = label === "Enero" || label === "Febrero"
  const isCurrentMonth = monthNumber === currentMonth

  if (isPaid) title = "Pagado";
  if (isVoid && !isNotAvailable) title = "Sin Pagar";
  if (isPending) title = "Atrasado";
  if (isNotAvailable) title = "No Disponible"

  return <div title={title}>
    <span className="text-sm flex justify-center">{text}</span>
    <div className={cn("rounded-md w-8 h-24", {
      "bg-green-500": isPaid,
      "bg-gray-300": isVoid,
      "border-4 border-red-600": isCurrentMonth,
      "bg-orange-300": isPending,
      "bg-gray-400": isNotAvailable
    })}></div>
  </div>
}