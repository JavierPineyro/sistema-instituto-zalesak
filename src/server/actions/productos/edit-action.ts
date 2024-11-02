"use server";

import { revalidatePath } from "next/cache";
import { Product, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { ProductUpdateSchema } from "~/lib/validations/product.schema";
import { service } from "~/server/services";

export default async function editProductAction(product: Product) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.PRODUCT_UPDATED,
  };

  try {
    const { data, success } = ProductUpdateSchema.safeParse(product);
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_PRODUCT_DATA);
    }

    const [result] = await service.precios.update(data);

    if (result && result.id) {
      Response.success = true;
      Response.message = ValidationMessage.PRODUCT_UPDATED;
    } else {
      throw new ValidationError(ValidationMessage.PRODUCT_UPDATE_ERROR);
    }
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = ValidationMessage.PRODUCT_ERROR_MSG;
    }
    console.error(error);

  }

  if (Response.success) {
    revalidatePath("/admin/productos");
  }
  return Response;
}
