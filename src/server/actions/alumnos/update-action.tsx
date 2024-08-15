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

  if (Response.success) {
    revalidatePath("/admin/alumnos")
  }
  return Response
}

