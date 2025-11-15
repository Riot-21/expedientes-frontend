import { expApi } from "@/app/api/api";
import { LoginResponse } from "../interfaces/auth.interface";

export const loginAction = async(email: string, password: string) => {
    try{
        const { data } = await expApi.post<LoginResponse>('/auth/login', {
            email,
            password
        });

        return data;

    }catch(error){
        throw error;
    }
}