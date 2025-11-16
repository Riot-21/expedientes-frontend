import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpAction } from "../actions/delete-expediente.action";

//custom hook con tansktack query para eliminar un expediente
export const useDeleteExp = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expedientes"] });
    },
  });
  return { mutation };
};
