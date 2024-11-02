"use server";

import { revalidatePath } from "next/cache";
import { ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { service } from "~/server/services";

export default async function deleteAction(id: number) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.EQUIPMENT_DELETED,
  };
  try {
    const [result] = await service.inventario.delete(id);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.EQUIPMENT_DELETED;
    } else {
      throw new ValidationError(ValidationMessage.EQUIPMENT_NOT_DELETED);
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
    revalidatePath("/admin/equipamientos");
    return Response;

}
