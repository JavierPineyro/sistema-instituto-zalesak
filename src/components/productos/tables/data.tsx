import { CheckCircleIcon, XCircle } from "lucide-react";

export const statuses = [
  {
    label: "Disponible",
    value: "disponible",
    icon: CheckCircleIcon,
  },
  {
    label: "No Disponible",
    value: "no disponible",
    icon: XCircle,
  },
];

export function getIsAvailableText(
  status: boolean,
): "disponible" | "no disponible" {
  return status ? "disponible" : "no disponible";
}
