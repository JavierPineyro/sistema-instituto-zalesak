"use client"

import { MoreHorizontal } from "lucide-react"
import { Row } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { Belt, UpdateAlumn } from "~/lib/types"
import UpdateAlumnModal from "~/components/alumnos/modals/update-alumn-modal"
import ActiveForm from "~/components/alumnos/forms/active-alumn-form"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const id = row.getValue("id") as number
  const belt = row.getValue("cinturon") as Belt

  const alumn: UpdateAlumn = {
    id,
    idBelt: String(belt.id),
    fullname: row.getValue("fullname"),
    tutor: row.getValue("tutor"),
    birthday: row.getValue("birthday"),
    phoneNumber: row.getValue("phoneNumber"),
    active: row.getValue("active"),
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Ver opciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link href={`/admin/alumnos/${id}`}>Ver más</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UpdateAlumnModal alumn={alumn}>
            Editar
          </UpdateAlumnModal>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ActiveForm id={id} active={alumn.active} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}