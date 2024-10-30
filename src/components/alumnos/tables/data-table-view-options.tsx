"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { GripHorizontal } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const labels = new Map<string, string>();
  // {
  //   phoneNumber: "Num. Teléfono",
  //   birthday: "Fecha de Nac.",
  //   tutor: "Tutor",
  //   active: "Estado"
  // }
  labels.set("phoneNumber", "Num. Teléfono");
  labels.set("birthday", "Fecha de Nac.");
  labels.set("tutor", "Tutor");
  labels.set("active", "Estado");
  labels.set("idBelt", "Id Cinturon");
  labels.set("cinturon", "Cinturon");

  function getLabelText(column: string) {
    return labels.get(column) ?? null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <GripHorizontal className="mr-2 h-4 w-4" />
          Vistas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Mostrar/Ocultar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            const text = getLabelText(column.id);
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {text}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
