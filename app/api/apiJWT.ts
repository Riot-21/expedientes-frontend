import axios from "axios";
import { useAuthStore } from "../login/store/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//creacion de instancia axios para metodos que requieren toekn
const expApiJwt = axios.create({
  baseURL: API_URL,
});

//interceptor para request - manda el token
expApiJwt.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//intecrceptor response - si hay 401(token invalido o no presente) llama a logout
expApiJwt.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
    }
    return Promise.reject(error);
  }
);

export { expApiJwt };
