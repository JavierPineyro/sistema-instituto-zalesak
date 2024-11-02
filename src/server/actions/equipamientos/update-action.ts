"use server";

import { revalidatePath } from "next/cache";
import { Inventory, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { UpdateEquipmentSchema } from "~/lib/validations/equipment.schema";
import { service } from "~/server/services";

export default async function updateEquipmentAction(inventory: Inventory) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.EQUIPMENT_UPDATED,
  };

  try {
    const { data, success } = UpdateEquipmentSchema.safeParse(inventory);
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_EQUIPMENT_DATA);
    }

    const [result] = await service.inventario.update(data);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.EQUIPMENT_UPDATED;
    } else {
      throw new ValidationError(ValidationMessage.EQUIPMENT_UPDATE_ERROR);
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
    revalidatePath("/admin/equipamientos");
  }
  return Response;
}
