import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createExpedienteAction } from "../actions/create-expediente.action";

//custom hook con tansktack query para crear expediente
export const useCreateExpediente = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createExpedienteAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expedientes']})
        },
    });

    return { mutation } 
}
