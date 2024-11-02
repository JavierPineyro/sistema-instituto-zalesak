import { z } from "zod";
import {
  AlumnCreateSchema,
  AlumnUpdateSchema,
} from "~/lib/validations/alumn.schema";

export { type Alumn } from "~/lib/validations/alumn.schema";

export enum ServiceProvider {
  CREDENTIALS = "credentials",
}

export enum ValidationMessage {
  // AUTH
  WRONG_EMAIL_OR_PASSWORD = "Email o contraseña incorrecta",
  UNEXPECTED_ERROR = "Ocurrió un error inesperado",
  SUCCESSFUL_LOGIN = "Se inició sesión correctamente",
  SUCCESSFUL_LOGOUT = "Se cerró sesión correctamente",
  BAD_CREDENTIALS = "Credenciales no válidas",
  SUCCESSFUL_REGISTER = "Se registró correctamente",
  // ALUMNS
  ALUMN_CREATED_SUCCESSFULLY = "El alumno se registró correctamente",
  ALUMN_ALREADY_EXISTS = "El alumno ya existe",
  ALUMN_NOT_FOUND = "El alumno no existe",
  ALUMN_UPDATED = "El alumno se actualizó correctamente",
  ALUMN_UPDATE_ERROR = "Error al actualizar el alumno",
  ALUMN_CREATE_ERROR = "Error al crear el alumno",
  WRONG_ALUMN_DATA = "Datos incorrectos o malformados del alumno",
  // BELTS
  BELT_UPDATED = "El cinturón se actualizó correctamente",
  BELT_MALFORMED = "Datos incorrectos o malformados del cinturón",
  BELT_CREATED_SUCCESSFULLY = "El cinturón se creó correctamente",
  BELT_CREATE_ERROR = "Error al crear el cinturón",
  BELT_UPDATE_ERROR = "Error al actualizar el cinturón",
  BELT_ERROR = "Error inesperado al realizar esta acción",
  //PAYMENT
  SUCCESFUL_PAYMENT = "El pago se realizó correctamente",
  PAYMENT_ERROR = "Error al realizar el pago",
  PAYMENT_NOT_FOUND = "El pago no existe",
  PAYMENT_MALFORMED = "Datos incorrectos o malformados del pago",
  //RECIEVE
  SUCCESSFUL_RECEIVE = "El recibo se creó correctamente",
  RECEIVE_MALFORMED = "Datos incorrectos o malformados del recibo",
  RECEIVE_ERROR = "Error al crear el recibo",
  RECEIVE_NOT_FOUND = "El recibo no existe",
  // PRODUCTS
  PRODUCT_CREATED_SUCCESSFULLY = "El producto se creó correctamente",
  PRODUCT_CREATE_ERROR = "Error al crear el producto",
  PRODUCT_UPDATED = "El producto se actualizó correctamente",
  PRODUCT_UPDATE_ERROR = "Error al actualizar el producto",
  PRODUCT_DELETED = "El producto se eliminó correctamente",
  PRODUCT_NOT_DELETED = "El producto no se pudo eliminar",
  WRONG_PRODUCT_DATA = "Datos incorrectos o malformados del producto",
  PRODUCT_ERROR_MSG = "Error inesperado al realizar esta acción",
  // ORDERS
  ORDER_CREATED_SUCCESSFULLY = "El pedido se creó correctamente",
  ORDER_CREATE_ERROR = "Error al crear el pedido",
  ORDER_UPDATED = "El pedido se actualizó correctamente",
  ORDER_UPDATE_ERROR = "Error al actualizar el pedido",
  ORDER_DELETED = "El pedido se eliminó correctamente",
  ORDER_NOT_DELETED = "El pedido no se pudo eliminar",
  WRONG_ORDER_DATA = "Datos incorrectos o malformados del pedido",
  // EQUIPMENTS
  EQUIPMENT_CREATED_SUCCESSFULLY = "El equipamiento se creó correctamente",
  EQUIPMENT_CREATE_ERROR = "Error al crear el equipamiento",
  EQUIPMENT_UPDATED = "El equipamiento se actualizó correctamente",
  EQUIPMENT_UPDATE_ERROR = "Error al actualizar el equipamiento",
  EQUIPMENT_DELETED = "El equipamiento se eliminó correctamente",
  EQUIPMENT_NOT_DELETED = "El equipamiento no se pudo eliminar",
  WRONG_EQUIPMENT_DATA = "Datos incorrectos o malformados del equipamiento",
}

export enum StatusActive {
  ACTIVE = "activo",
  INACTIVE = "inactivo",
}

export enum CUOTA_STATUS {
  PAGADO = "pagado",
  VACIO = "vacio",
  ATRASADO = "atrasado",
}

export type Belt = {
  id: number;
  name: string;
  description?: string | null;
};

export type NewAlumnToSave = {
  fullname: string;
  birthday: string;
  idBelt: number;
  phoneNumber?: string | undefined;
  tutor?: string | undefined;
};

export type NewAlumn = z.infer<typeof AlumnCreateSchema>; // NO uSADO MAS
export type UpdateAlumn = z.infer<typeof AlumnUpdateSchema>;
export type UpdateAlumnWithNumberBeltId = Omit<UpdateAlumn, "idBelt"> & {
  idBelt: number;
};

export type ResponseAction = {
  success: boolean;
  message: string;
};

export type Payment = {
  id: number;
  date: string;
  month: string;
  idAlumn: number;
  idRecieve: number;
};

export type RawPayment = {
  date: string;
  month: string;
  idAlumn: string;
  idRecieve: string;
};
export type NewPayment = {
  date: string;
  month: string;
  idAlumn: number;
  idRecieve: number;
};

export type PaymentWithoutId = Omit<Payment, "id">;

export type PaymentFormData = {
  amount: number;
  writtenAmount: string;
  date: Date;
  nameClient: string;
  idAlumn: number;
  concept: string;
  recharge: boolean;
  percentage: number;
  total: number;
  month: string;
};

export type PaymentTable = {
  id: number;
  date: string;
  month: string;
  idAlumn: number;
  idRecieve: number;
  recibo: {
    nameClient: string;
    concept: string | null;
    total: number;
  };
};

export type Recieve = {
  id: number;
  date: string;
  idAlumn: number | null;
  amount: number;
  writtenAmount: string | null;
  nameClient: string;
  concept: string | null;
  recharge: boolean;
  total: number;
  tipo: string;
};

//Products
export type Product = {
  id: number;
  name: string;
  publicPrice: number;
  teacherPrice: number;
  active: boolean;
};
export type ProductAction = {
  name: string;
  publicPrice: number;
  teacherPrice: number;
};

// Orders
export type State = "entregado" | "pendiente" | "cancelado";

export type Order = {
  id: number;
  idProduct: number;
  quantity: number;
  idAlumn: number;
  total: number;
  state: State;
};

export type NewOrder = {
  idProduct: number;
  quantity: number;
  idAlumn: number;
  state: string;
  total: number;
};

export type OrderResponse = {
  id: number;
  idProduct: number;
  producto: {
    name: string;
    publicPrice: number;
  };
  quantity: number;
  idAlumn: number | null;
  alumno: {
    fullname: string;
  } | null;
  total: number;
  state: string;
};

export type OrderTable = {
  fullname: string;
  name: string;
  publicPrice: number;
  id: number;
  idProduct: number;
  quantity: number;
  idAlumn: number | null;
  total: number;
  state: string;
};

// INVENTORY
export type Inventory = {
  id: number;
  name: string;
  quantity: number;
  observation: string | null;
};

export type NewInventory = {
  name: string;
  quantity: number;
  observation: string | null;
};
