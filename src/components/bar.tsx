import { CUOTA_STATUS as STATUS } from '~/lib/types'
import { cn, months } from '~/lib/utils'

type Props = {
  label: string
  status: STATUS
  admissionDate: string
}
export default function Bar({ label, status, admissionDate }: Props) {

  const text = label.slice(0, 3)
  let title = ""

  // if is current month add a border to highlight
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const monthNumber = months.indexOf(label) + 1

  // get admission date to compare if the month of admission is before the monthNumber
  const admissionMonth = new Date(admissionDate).getMonth() + 1
  const admissionYear = new Date(admissionDate).getFullYear()

  const isBeforeAdmission = monthNumber < admissionMonth && currentYear === admissionYear
  const isPending = (currentMonth >= monthNumber) && status === STATUS.VACIO
  const isPaid = status === STATUS.PAGADO
  const isVoid = status === STATUS.VACIO
  const isNotAvailable = label === "Enero" || label === "Febrero" || isBeforeAdmission
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