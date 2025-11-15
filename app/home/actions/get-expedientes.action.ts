import { ExpedienteResponse } from "../interfaces/expediente.interface"
import { expApiJwt } from "@/app/api/apiJWT";

export const getExpedientesAction = async(): Promise<ExpedienteResponse[]> => {
    const { data } = await expApiJwt.get<ExpedienteResponse[]>('/expediente');
    return data;
}