import { expApiJwt } from "@/app/api/apiJWT";

export const deleteExpAction = async (id: string): Promise<void> => {
    await expApiJwt.delete<void>(`/expediente/${id}`);
};
