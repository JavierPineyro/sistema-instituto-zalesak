import { CheckCircleIcon, XCircle, Clock } from "lucide-react";

export const statuses = [
  {
    value: "entregado",
    label: "Entregado",
    icon: CheckCircleIcon,
  },
  {
    value: "pendiente",
    label: "Pendiente",
    icon: Clock,
  },
  {
    value: "cancelado",
    label: "Cancelado",
    icon: XCircle,
  },
];
