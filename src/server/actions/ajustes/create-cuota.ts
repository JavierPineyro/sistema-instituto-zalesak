"use server";

import { revalidatePath } from "next/cache";
import { ResponseAction } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { CuotaCreateSchema } from "~/lib/validations/settings.schema";
import { service } from "~/server/services";

type CreateCuotaAction = {
  price: number;
};

export default async function createCuotaAction(cuota: CreateCuotaAction) {
  const Response: ResponseAction = {
    success: true,
    message: "",
  };

  try {
    const { data, success } = CuotaCreateSchema.safeParse(cuota);
    if (!success) {
      throw new ValidationError("Datos incorrectos o malformados de la cuota");
    }

    const [result] = await service.precioServicio.createCuotaService(data);

    if (!result) {
      Response.success = false;
      Response.message = "Error al crear la cuota";
    } else {
      Response.message = "Cuota creada correctamente!";
    }
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = "Error al crear la cuota";
    }
  }

  revalidatePath("/admin/ajustes");
  return Response;
}
