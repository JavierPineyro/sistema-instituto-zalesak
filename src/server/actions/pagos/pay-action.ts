 "use server"

import { revalidatePath } from "next/cache";
import {
  PaymentFormData,
  ResponseAction,
  ValidationMessage,
} from "~/lib/types";
import { formatDateForDB, ValidationError } from "~/lib/utils";
import { FormDataPaymemntSchema } from "~/lib/validations/payment.schema";
import { service } from "~/server/services";

export default async function payAction(payment: PaymentFormData) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.SUCCESFUL_PAYMENT,
  };

  try {
    const { data, success } = FormDataPaymemntSchema.safeParse(payment);
    if (!success) {
      throw new ValidationError(ValidationMessage.PAYMENT_MALFORMED);
    }
    const dateToString = formatDateForDB(data.date);
    const newRecieve = {
      amount: data.amount,
      writtenAmount: data.writtenAmount,
      date: dateToString,
      nameClient: data.nameClient,
      idAlumn: data.idAlumn,
      concept: data.concept,
      recharge: data.recharge,
      total: data.total,
    };

    const [recieve] = await service.recibos.save(newRecieve);
    if (!recieve || !recieve.id) {
      throw new ValidationError(ValidationMessage.RECEIVE_ERROR);
    }

    const newPayment = {
      idAlumn: data.idAlumn,
      idRecieve: recieve.id,
      month: data.month,
      date: dateToString,
    };

    await service.pagos.save(newPayment);
    revalidatePath(`"/admin/alumnos/${data.idAlumn}/pagar"`);
    Response.success = true;
    Response.message = ValidationMessage.SUCCESFUL_PAYMENT;
  } catch (error) {
    Response.success = false;
    if (error instanceof ValidationError) {
      Response.message = error.message;
    } else {
      Response.message = ValidationMessage.PAYMENT_ERROR;
    }
    console.log("Error al pagar", error);
  }

  /*if (Response.success) {
    revalidatePath(`"/admin/alumnos/${parsedIdAlumn}/pagar"`);
    }*/
  return Response;
}
