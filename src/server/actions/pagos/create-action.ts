import { RawPayment, ResponseAction, ValidationMessage } from "~/lib/types";

export default async function createPayment(payment: RawPayment) {
  const Response: ResponseAction = {
    success: true,
    message: ValidationMessage.SUCCESFUL_PAYMENT,
  };

  // go on
}
