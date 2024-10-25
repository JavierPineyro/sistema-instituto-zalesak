"use server";

import { revalidatePath } from "next/cache";
import { Recieve, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { RecieveCreateSchema } from "~/lib/validations/recieve.schema";
import { service } from "~/server/services";

type RecieveWithoutId = Omit<Recieve, "id">;

export default async function createRecieveOfOrderAction(
  recieve: RecieveWithoutId,
  idAlumn: number,
) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.SUCCESSFUL_RECEIVE,
  };

  try {
    const { data, success } = RecieveCreateSchema.safeParse(recieve);
    if (!success) {
      throw new ValidationError(ValidationMessage.RECEIVE_MALFORMED);
    }
    const [result] = await service.recibos.save(data);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.SUCCESSFUL_RECEIVE;
    } else {
      throw new ValidationError(ValidationMessage.RECEIVE_ERROR);
    }
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = ValidationMessage.UNEXPECTED_ERROR;
      console.error(error);
    }
  }

  if (Response.success) {
    revalidatePath(`/admin/alumnos/${idAlumn}/pedidos`);
    revalidatePath("/admin/pedidos");
  }
  return Response;
}
