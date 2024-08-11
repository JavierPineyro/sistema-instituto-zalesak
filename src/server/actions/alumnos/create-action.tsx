"use server"

import { revalidatePath } from "next/cache";
import { NewAlumn, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { AlumnCreateSchema } from "~/lib/validations/alumn.schema";
import { service } from "~/server/services";

export default async function createAlumnAction(alumn: NewAlumn) {

  const Response: ResponseAction = {
    success: true,
    message: ''
  }

  try {
    const { data, success } = AlumnCreateSchema.safeParse(alumn)
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_ALUMN_DATA)
    }

    // ver que el alumno no exista ya
    const alumnExist = await service.alumnos.checkIfAlreadyExist(data.fullname)
    if (alumnExist) {
      throw new ValidationError(ValidationMessage.ALUMN_ALREADY_EXISTS)
    }
    // llamar al servicio para agregar alumno a la DB
    await service.alumnos.save(data)
    Response.success = true
    Response.message = ValidationMessage.ALUMN_CREATED_SUCCESSFULLY

  } catch (error) {
    Response.success = false
    if (error instanceof ValidationError) {
      Response.message = error.message
    } else {
      Response.message = ValidationMessage.ALUMN_CREATE_ERROR
    }
  }

  if (Response.success) {
    revalidatePath("/admin/alumnos")
  }
  return Response
}

