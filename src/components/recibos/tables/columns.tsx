"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "~/components/tables/data-table-column-header";
import { Recieve } from "~/lib/types";
import { parseToLocalDate, parseTotalToLocale } from "~/lib/utils";

export const columns: ColumnDef<Recieve>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "concept",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="En concepto de" />
    ),
    cell: ({ row }) => {
      const concept = row.getValue("concept") as string;
      return (
        <div className="flex space-x-1">
          <span className="max-w-[500px] truncate font-medium">
            {concept ?? "---"}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      const dateToShow = parseToLocalDate(date);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[400px] truncate text-center font-medium">
            {dateToShow}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monto Total" />
    ),
    cell: ({ row }) => {
      const total = row.getValue("total") as number;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {parseTotalToLocale(total)}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "recharge",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Con recargo" />
    ),
    cell: ({ row }) => {
      const recharge = row.getValue("recharge") as number;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {recharge ? "Sí" : "No"}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {tipo ?? "---"}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "more",
    header: ({ column }) => <DataTableColumnHeader column={column} title="-" />,
    cell: ({ row }) => {
      const idRecieve = row.getValue("id") as number;
      const idAlumno = row.original.idAlumn! as number;
      return (
        <Link
          href={`/admin/alumnos/${idAlumno}/recibos/${idRecieve}`}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <EyeIcon className="mr-2 inline size-4 text-current" />
          Ver
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
