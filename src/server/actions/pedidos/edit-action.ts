"use server";

import { revalidatePath } from "next/cache";
import { ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { OrderUpdateSchema } from "~/lib/validations/order.schema";
import { service } from "~/server/services";

type OrderAction = {
  id: number;
  idProduct: number;
  quantity: number;
  idAlumn: number | null;
  total: number;
  state: string;
};

export default async function editOrderAction(order: OrderAction) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.ORDER_UPDATED,
  };

  try {
    const { data, success } = OrderUpdateSchema.safeParse(order);
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_ORDER_DATA);
    }

    const [result] = await service.pedidos.update(data);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.ORDER_UPDATED;
    } else {
      throw new ValidationError(ValidationMessage.ORDER_UPDATE_ERROR);
    }
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = ValidationMessage.UNEXPECTED_ERROR;
    }
    console.error(error);

  }

  if (Response.success) {
    revalidatePath("/admin/pedidos");
  }
  return Response;
}
