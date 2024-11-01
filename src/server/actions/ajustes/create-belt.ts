"use server";

import { revalidatePath } from "next/cache";
import { ResponseAction } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { BeltCreateSchema } from "~/lib/validations/settings.schema";
import { service } from "~/server/services";

export default async function createBeltAction(belt: {
  name: string;
  description: string;
}) {
  const Response: ResponseAction = {
    success: true,
    message: "",
  };

  try {
    const { data, success } = BeltCreateSchema.safeParse(belt);
    if (!success) {
      throw new ValidationError("Datos incorrectos o malformados del cinturón");
    }

    await service.cinturones.save(data);

    Response.success = true;
    Response.message = "Cinturón creado correctamente!";
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = "Error al crear el cinturón";
    }
  }

  if (Response.success) {
    revalidatePath("/admin/ajustes");
  }
  return Response;
}
