"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableRowActions } from "./data-table-row-actions"
import { Alumn, Belt } from "~/lib/types"
import { Checkbox } from "~/components/ui/checkbox"
import { statuses } from "./data"
import { getIsActiveText, parseToLocalDate } from "~/lib/utils"
import { DataTableColumnHeader } from "~/components/tables/data-table-column-header"

export const columns: ColumnDef<Alumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("fullname")}
          </span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nro. Teléfono" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] text-center truncate font-medium">
            {
              row.getValue("phoneNumber") !== ""
                ? row.getValue("phoneNumber")
                : "---"
            }
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de nac." />
    ),
    cell: ({ row }) => {
      const birthday = parseToLocalDate(row.getValue("birthday"))
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {birthday}
          </span>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "cinturon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cinturón" />
    ),
    cell: ({ row }) => {
      // en el original aparece idBelt y cinturon
      const cinturon = row.getValue("cinturon") as Belt
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {cinturon.name ?? "-"}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "tutor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tutor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("tutor") ?? "---"}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const textIsActive = getIsActiveText(row.getValue("active") as boolean)
      const state = statuses.find(
        (status) => status.value === textIsActive
      )

      if (!state) {
        return null
      }

      return (
        <div className="flex items-center">
          {state.icon && (
            <state.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{state.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowValue = getIsActiveText(row.getValue(id) as boolean)
      return value.includes(rowValue)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]