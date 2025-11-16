import { useQuery } from "@tanstack/react-query"
import { getExpedientesAction } from "../actions/get-expedientes.action"

//custom hook con tansktack query para listar los expedientes
export const useExpediente = () => {
    return useQuery({
        queryKey: ['expedientes'],
        queryFn: getExpedientesAction,
        staleTime: 1000 * 60 * 5, 
    })
}