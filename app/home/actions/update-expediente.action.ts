import { expApiJwt } from "@/app/api/apiJWT";
import { ExpedienteResponse } from "../interfaces/expediente.interface";
import { EditForm, editSchema } from "../interfaces/schemas.interface";

export const updateExpedienteAction = async(datos: EditForm, id: string):Promise<ExpedienteResponse> => {
    const parsedData = editSchema.safeParse(datos);
    if(!parsedData.success){
        throw new Error("Datos invalidos");
    }
    
    const { data } = await expApiJwt.patch<ExpedienteResponse>(`/expediente/${id}`, parsedData.data);
    return data;
}