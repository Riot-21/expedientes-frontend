import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpedienteAction } from "../actions/update-expediente.action";
import { EditForm } from "../interfaces/schemas.interface";

export const useUpdateExp = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({id, datos}: {id: string, datos: EditForm}) => updateExpedienteAction(datos, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expedientes"] });
    },
  });
  return { mutation };
};
