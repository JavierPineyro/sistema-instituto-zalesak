"use server";

import { revalidatePath } from "next/cache";
import { ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { BeltUpdateSchema } from "~/lib/validations/settings.schema";
import { service } from "~/server/services";

export default async function updateBeltAction(belt: {
  name: string;
  id: number;
  description: string | null;
}) {
  const Response: ResponseAction = {
    success: true,
    message: "",
  };

  try {
    const { data, success } = BeltUpdateSchema.safeParse(belt);
    if (!success) {
      throw new ValidationError(ValidationMessage.BELT_MALFORMED);
    }

    const [result] = await service.cinturones.update(data);

    if (!result) {
      Response.success = false;
      Response.message = ValidationMessage.BELT_UPDATE_ERROR;
    } else {
      Response.message = ValidationMessage.BELT_UPDATED;
    }
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = ValidationMessage.BELT_ERROR;
    }
  }

  revalidatePath("/admin/ajustes");
  return Response;
}
