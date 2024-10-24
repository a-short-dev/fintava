import { AxiosError } from "axios";
import HandleError from "./handle-error";

export function handleAxiosError(error: AxiosError): HandleError {
  return new HandleError(error);
}
