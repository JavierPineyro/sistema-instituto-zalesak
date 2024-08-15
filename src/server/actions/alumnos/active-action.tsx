"use server"

import { ResponseAction } from "~/lib/types"
import { service } from "~/server/services"

export default async function activeAlumnAction(
  { id, active }: { id: number, active: boolean }, formData: FormData) {
  // lo hago asi para ver si llega aunque no lo usao
  const idAlumn = formData.get("id") as string
  const activeAlumn = formData.get("active") as string

  const response: ResponseAction = {
    success: true,
    message: "",
  }

  try {
    const [result] = await service.alumnos.changeIsActive(id, !active)
    if (result) {
      response.message = "Alumno actualizado correctamente"
    } else {
      response.success = false
      response.message = "Error al actualizar el alumno"
    }
  } catch (error) {
    console.error("Error activando o desactivando alumno", error)
    response.success = false
    response.message = "Error interno del servidor, inténtalo más tarde"
  }

  return response
}