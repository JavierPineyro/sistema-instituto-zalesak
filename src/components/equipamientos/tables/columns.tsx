"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/tables/data-table-column-header";
import { Inventory } from "~/lib/types";
import UpdateEquipmentModal from "../modals/update-modal";
import DeleteEquipmentModal from "../modals/delete-modal";

export const columns: ColumnDef<Inventory>[] = [
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
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name") ?? "---"}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad" />
    ),
    cell: ({ row }) => {
      const cantidad = (row.getValue("quantity") as number) ?? 0;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate text-center font-medium">
            {cantidad}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "observation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observaciones" />
    ),
    cell: ({ row }) => {
      const observation = (row.getValue("observation") as string) ?? "-";
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {observation}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "edit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="-" />,
    cell: ({ row }) => {
      const equipment = row.original as Inventory;
      return <UpdateEquipmentModal equipment={equipment} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "delete",
    header: ({ column }) => <DataTableColumnHeader column={column} title="-" />,
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <DeleteEquipmentModal id={id} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
