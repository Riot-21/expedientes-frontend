import { expApiJwt } from "@/app/api/apiJWT";
import { ExpedienteResponse } from "../interfaces/expediente.interface";
import { ExpedienteForm, expedienteSchema } from "../interfaces/schemas.interface";

export const createExpedienteAction = async(datos: ExpedienteForm):Promise<ExpedienteResponse> => {
    const parsedData = expedienteSchema.safeParse(datos);
    if(!parsedData.success){
        throw new Error("Datos invalidos");
    }
    
    const { data } = await expApiJwt.post<ExpedienteResponse>('/expediente', parsedData.data);
    return data;
}