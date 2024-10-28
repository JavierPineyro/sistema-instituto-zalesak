import { CheckCircle, XCircle, Clock } from "lucide-react";

export const statuses = [
  {
    value: "entregado",
    label: "Entregado",
    icon: CheckCircle,
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
