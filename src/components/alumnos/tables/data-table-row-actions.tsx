"use client";

import { MoreHorizontal, EditIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Belt } from "~/lib/types";
import ActiveForm from "~/components/alumnos/forms/active-alumn-form";
import { cn } from "~/lib/utils";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row.getValue("id") as number;
  const belt = row.getValue("cinturon") as Belt;

  const alumn = {
    id,
    idBelt: String(belt.id),
    fullname: row.getValue("fullname"),
    tutor: row.getValue("tutor"),
    birthday: row.getValue("birthday"),
    phoneNumber: row.getValue("phoneNumber"),
    active: row.getValue("active") as boolean,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Ver opciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className={cn("p-0")}>
          <Link
            className="h-auto w-full px-2 py-1.5 transition-colors hover:bg-gray-300"
            href={`/admin/alumnos/${id}`}
          >
            Ver más
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn("p-0")}>
          <Link
            className="flex h-auto w-full items-center px-2 py-1.5 transition-colors hover:bg-gray-300"
            href={`/admin/alumnos/${id}/editar`}
          >
            Editar
            <EditIcon className="ml-2 inline size-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ActiveForm id={id} active={alumn.active} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
