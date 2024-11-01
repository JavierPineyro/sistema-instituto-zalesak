"use server";

import { revalidatePath } from "next/cache";
import { ResponseAction } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { CuotaUpdateSchema } from "~/lib/validations/settings.schema";
import { service } from "~/server/services";

export default async function updateCuotaAction(cuota: {
  name: string;
  id: number;
  price: number;
  updatedAt: Date;
}) {
  const Response: ResponseAction = {
    success: true,
    message: "",
  };

  try {
    const { data, success } = CuotaUpdateSchema.safeParse(cuota);
    if (!success) {
      throw new ValidationError("Datos incorrectos o malformados de la cuota");
    }

    const [result] = await service.precioServicio.updateCuotaService(data);

    if (!result) {
      Response.success = false;
      Response.message = "Error al actualizar la cuota";
    } else {
      Response.message = "Cuota actualizada correctamente!";
    }
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = "Error al actualizar la cuota";
    }
  }

  revalidatePath("/admin/ajustes");
  return Response;
}
