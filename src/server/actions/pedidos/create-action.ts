"use server";

import { revalidatePath } from "next/cache";
import { ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { OrderCreateSchema } from "~/lib/validations/order.schema";
import { service } from "~/server/services";

type OrderAction = {
  idProduct: number;
  quantity: number;
  idAlumn: number;
  state: string;
  total: number;
  concept: string;
  writtenAmount: string;
  date: string;
  nameClient: string;
};

export default async function createOrderAction(
  order: OrderAction,
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

    // CREO EL PEDIDO
    const [result] = await service.pedidos.save(data);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.ORDER_CREATED_SUCCESSFULLY;
    } else {
      throw new ValidationError(ValidationMessage.ORDER_CREATE_ERROR);
    }

    // CREAR EL RECIBO
    const [recibo] = await service.recibos.save({
      concept: data.concept,
      writtenAmount: data.writtenAmount,
      date: data.date,
      idAlumn: idAlumn,
      total: data.total,
      amount: data.total,
      nameClient: data.nameClient,
      recharge: false,
    });

    if (!recibo) {
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
