"use server";

import { revalidatePath } from "next/cache";
import { NewOrder, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { OrderCreateSchema } from "~/lib/validations/order.schema";
import { service } from "~/server/services";

export default async function createOrderAction(
  order: NewOrder,
  idAlumn: number,
) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.ORDER_CREATED_SUCCESSFULLY,
  };

  try {
    const { data, success } = OrderCreateSchema.safeParse(order);
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_ORDER_DATA);
    }
    const [result] = await service.pedidos.save(data);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.ORDER_CREATED_SUCCESSFULLY;
    } else {
      throw new ValidationError(ValidationMessage.ORDER_CREATE_ERROR);
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
