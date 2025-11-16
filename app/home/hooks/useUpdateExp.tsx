import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpedienteAction } from "../actions/update-expediente.action";
import { EditForm } from "../interfaces/schemas.interface";

//custom hook con tansktack query para editar y actualizar un expediente
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
