"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCircleIcon, EditIcon, XCircle } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "~/components/tables/data-table-column-header";
import { Product } from "~/lib/types";
import { cn, parseTotalToLocale } from "~/lib/utils";
//import { getIsAvailableText, statuses } from "./data";
//import DeleteProductModal from "../modals/delete-product";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "publicPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio Público" />
    ),
    cell: ({ row }) => {
      const publicPrice = (row.getValue("publicPrice") as number) ?? 0;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate text-center font-medium">
            {parseTotalToLocale(publicPrice)}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "teacherPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio Instructor" />
    ),
    cell: ({ row }) => {
      const teacherPrice = (row.getValue("teacherPrice") as number) ?? 0;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {parseTotalToLocale(teacherPrice)}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const state = row.getValue("active") as boolean;
      //const stateText = getIsAvailableText(state);
      //const status = statuses.find((status) => status.value === stateText);
      if (!status) {
        return null;
      }

      return (
        <div
          className={cn("flex items-center", {
            "text-red-500": !state,
            "text-green-500": state,
          })}
        >
          {/* status?.icon && (
            <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )*/}
          <span>{/*status.label*/}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as boolean;
      //const stateText = getIsAvailableText(rowValue);
      //return value.includes(stateText);
      return true;
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
          href={`/admin/productos/editar/${id}`}
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
      //return <DeleteProductModal id={id} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
