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
    phoneNumber: "1234567890",
    active: true,
    birthday: "1998-3-6",
    idBelt: 1,
    tutor: "Maria Torres",
    cinturon: {
      name: "blanco",
      id: 1
    }
  },
  {
    id: 2,
    fullname: "Jane Smith",
    phoneNumber: "0987654321",
    active: false,
    birthday: "1998-10-12",
    idBelt: 1,
    tutor: "Pedro Rodriguez",
    cinturon: {
      name: "blanco",
      id: 1
    }
  }
]