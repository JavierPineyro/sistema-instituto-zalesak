"use server";

import { ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { service } from "~/server/services";

export default async function deleteAction(id: number) {
  const Response: ResponseAction = {
    success: true,
    message: "Producto eliminado correctamente",
  };
  try {
    const [result] = await service.precios.delete(id);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.PRODUCT_DELETED;
    } else {
      throw new ValidationError(ValidationMessage.PRODUCT_NOT_DELETED);
    }
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = ValidationMessage.PRODUCT_ERROR;
    }
  } finally {
    return Response;
  }
}
