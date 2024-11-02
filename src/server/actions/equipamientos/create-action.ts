"use server";

import { revalidatePath } from "next/cache";
import { NewInventory, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { CreateEquipmentSchema } from "~/lib/validations/equipment.schema";
import { service } from "~/server/services";

export default async function createEquipmentAction(inventory: NewInventory) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.EQUIPMENT_CREATED_SUCCESSFULLY,
  };

  try {
    const { data, success } = CreateEquipmentSchema.safeParse(inventory);
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_EQUIPMENT_DATA);
    }

    const [result] = await service.inventario.save(data);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.EQUIPMENT_CREATED_SUCCESSFULLY;
    } else {
      throw new ValidationError(ValidationMessage.EQUIPMENT_CREATE_ERROR);
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
