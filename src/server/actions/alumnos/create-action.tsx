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
  // Verificar si alguno de los datos llega vacio (como el cinturon o otros) 
  // y enviar un mensaje de error para que no solo diga Error creando alumno
  // y diga que el error es porque no se completo el dato que falta
  // enviar un mensaje de error diferente por cada campo que falte y que zod no lo reconozca, como los SELECT o eso, usar el parse y no safeParse si es necesario.
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

