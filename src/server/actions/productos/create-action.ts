"use server";

import { revalidatePath } from "next/cache";
import { ProductAction, ResponseAction, ValidationMessage } from "~/lib/types";
import { ValidationError } from "~/lib/utils";
import { ProductCreateSchema } from "~/lib/validations/product.schema";
import { service } from "~/server/services";

export default async function createProductAction(product: ProductAction) {
  const Response: ResponseAction = {
    success: true,
    message: "",
  };
  try {
    const { data, success } = ProductCreateSchema.safeParse(product);
    if (!success) {
      throw new ValidationError(ValidationMessage.WRONG_PRODUCT_DATA);
    }

    const [result] = await service.precios.save(data);
    if (!result || !result.id) {
      throw new ValidationError(ValidationMessage.PRODUCT_CREATE_ERROR);
    }

    Response.success = true;
    Response.message = ValidationMessage.PRODUCT_CREATED_SUCCESSFULLY;
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = ValidationMessage.PRODUCT_ERROR_MSG;
    }
    console.log("Error al crear producto", error);
  }
  if (Response.success) {
    revalidatePath("/admin/productos");
  }
  return Response;
}
