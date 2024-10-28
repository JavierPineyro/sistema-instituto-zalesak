"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "~/components/tables/data-table-column-header";
import { OrderTable, State } from "~/lib/types";
import { cn, getOrderState, parseTotalToLocale } from "~/lib/utils";
import DeleteOrderModal from "../modals/delete-order-modal";

export const columns: ColumnDef<OrderTable>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {name ?? "---"}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "publicPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio" />
    ),
    cell: ({ row }) => {
      const publicPrice = row.getValue("publicPrice") as number;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate text-center font-medium">
            {parseTotalToLocale(publicPrice)}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad" />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{quantity}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const total = row.getValue("total") as number;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {parseTotalToLocale(total)}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pedido por" />
    ),
    cell: ({ row }) => {
      const alumno = row.getValue("fullname") as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {alumno ?? "---"}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const state = row.getValue("state") as State;
      const { status, wasDelivered, isPending, isCanceled } =
        getOrderState(state);

      return (
        <div
          className={cn("flex items-center", {
            "text-red-500": isCanceled,
            "text-orange-500": isPending,
            "text-green-500": wasDelivered,
          })}
        >
          {status?.icon && <status.icon />}
          <span>{status?.label}</span>
        </div>
      );
    },
    filterFn: (row, id, filterValue) => {
      const state = row.getValue("state");
      return filterValue.includes(state);
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "edit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="-" />,
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return (
        <Link
          href={`/admin/pedidos/editar/${id}`}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <EditIcon className="mr-2 inline size-4 text-current" />
          Editar
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "delete",
    header: ({ column }) => <DataTableColumnHeader column={column} title="-" />,
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <DeleteOrderModal id={id} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
