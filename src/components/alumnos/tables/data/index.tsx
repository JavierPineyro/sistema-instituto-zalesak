import { CheckCircleIcon, XCircle } from "lucide-react"
import { Alumn } from "~/lib/types"

export const statuses = [
  {
    label: "Activo",
    value: "activo",
    icon: CheckCircleIcon,
  },
  {
    label: "Inactivo",
    value: "inactivo",
    icon: XCircle,
  },
]

export const mockAlumn: Alumn[] = [
  {
    id: 1,
    fullname: "John Doe",
    cellphone: "1234567890",
    active: true,
    birthday: new Date(1999, 5, 22),
    idBelt: 1,
    tutor: "Maria Torres"
  },
  {
    id: 2,
    fullname: "Jane Smith",
    cellphone: "0987654321",
    active: false,
    birthday: new Date(2000, 8, 15),
    idBelt: 1,
    tutor: "Pedro Rodriguez"
  }
]