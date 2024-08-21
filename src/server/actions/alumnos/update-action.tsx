"use server"

import { revalidatePath } from "next/cache";
import { UpdateAlumn, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { AlumnUpdateSchema } from "~/lib/validations/alumn.schema";
import { service } from "~/server/services";

export default async function updateAlumnAction(alumn: UpdateAlumn) {

  const Response: ResponseAction = {
    success: true,
    message: ''
  }
  // Verificar si alguno de los datos llega vacio (como el cinturon o otros) 
  // y enviar un mensaje de error para que no solo diga Error desconocido
  // y diga que el error es porque no se completo el dato que falta
  // enviar un mensaje de error diferente por cada campo que falte y que zod no lo reconozca, como los SELECT o eso
  try {
    const { data, success } = AlumnUpdateSchema.safeParse(alumn)
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_ALUMN_DATA)
    }
    const { idBelt: belt, ...rest } = data
    const idBelt = Number(belt)
    const alumnToUpdate = { ...rest, idBelt }

    const [result] = await service.alumnos.update(alumnToUpdate)

    if (!result) {
      Response.success = false
      Response.message = ValidationMessage.ALUMN_UPDATE_ERROR
    } else {
      Response.message = ValidationMessage.ALUMN_UPDATED
    }

  } catch (error) {
    Response.success = false
    if (error instanceof ValidationError) {
      Response.message = error.message
    } else {
      Response.message = ValidationMessage.ALUMN_UPDATE_ERROR
    }
  }

  revalidatePath("/admin/alumnos")
  return Response
}

