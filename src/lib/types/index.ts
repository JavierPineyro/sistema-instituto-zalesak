import { z } from "zod";
import { AlumnCreateSchema } from "~/lib/validations/alumn.schema";

export { type Alumn } from "~/lib/validations/alumn.schema";

export enum ServiceProvider {
  CREDENTIALS = "credentials",
}

export enum ValidationMessage {
  WRONG_EMAIL_OR_PASSWORD = "Email o contraseña incorrecta",
  UNEXPECTED_ERROR = "Ocurrió un error inesperado",
  SUCCESSFUL_LOGIN = "Se inició sesión correctamente",
  BAD_CREDENTIALS = "Credenciales no válidas",
  SUCCESSFUL_REGISTER = "Se registró correctamente",
  ALUMN_CREATED_SUCCESSFULLY = "El alumno se registró correctamente",
  ALUMN_ALREADY_EXISTS = "El alumno ya existe",
  ALUMN_NOT_FOUND = "El alumno no existe",
  ALUMN_UPDATED = "El alumno se actualizó correctamente",
  ALUMN_CREATE_ERROR = "Error al crear el alumno",
  BELT_NOT_FOUND = "El cinturón no existe",
  BELT_ALREADY_EXISTS = "El cinturón ya existe",
  BELT_UPDATED = "El cinturón se actualizó correctamente",
  BELT_DELETED = "El cinturón se eliminó correctamente",
  SUCCESSFUL_LOGOUT = "Se cerró sesión correctamente",
  WRONG_ALUMN_DATA = "Datos incorrectos o malformados al intentar crear un nuevo alumno",
}

export enum StatusActive {
  ACTIVE = "activo",
  INACTIVE = "inactivo",
}

export type Belt = {
  id: number;
  name: string;
  description?: string | null;
};

export type NewAlumn = z.infer<typeof AlumnCreateSchema>;

export type ResponseAction = {
  success: boolean;
  message: string;
};
