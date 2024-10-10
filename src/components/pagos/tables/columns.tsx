"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableColumnHeader } from "~/components/tables/data-table-column-header";
import { PaymentTable } from "~/lib/types";
import { parseToLocalDate, parseTotalToLocale } from "~/lib/utils";

// TODO: Poner la fecha capaz y formatear el total y que ponga $15000,00
// TODO: los tipos cuando se castean
export const columns: ColumnDef<PaymentTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "concept",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Concepto" />
    ),
    cell: ({ row }) => {
      const recibo = row.original.recibo;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {recibo?.concept ?? "---"}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const recibo = row.original.recibo;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate text-center font-medium">
            {recibo?.total ? parseTotalToLocale(recibo?.total) : "---"}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "month",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("month")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de pago" />
    ),
    cell: ({ row }) => {
      const dateOfPayment = row.getValue("date") as string;
      const date = parseToLocalDate(dateOfPayment);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{date}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "idRecieve",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recibo" />
    ),
    cell: ({ row }) => {
      const idRecieve = row.getValue("idRecieve") as number;
      const idAlumn = row.original.idAlumn
      return (
        <div className="flex space-x-2">
          <Link
            className="text-blue-400 transition-colors hover:text-blue-500 hover:underline"
            href={`/admin/alumnos/${idAlumn}/recibos/${idRecieve}`}
          >
            ver más
          </Link>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
