import { create } from "zustand";
import { loginAction } from "../actions/login.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  //valores
  userId: string | null;
  token: string | null;
  authStatus: AuthStatus;
  isChecked: boolean;

  //funciones
  checkAuth: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  //definicion de valores por defecto
  userId: null,
  token: null,
  authStatus: "checking",
  isChecked: false,

  //metodo que valida si hay token y define autenticacion
  checkAuth: () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      set({ token: null, authStatus: "not-authenticated", isChecked: true });
      return;
    } else {
      set({ token: token, authStatus: "authenticated", isChecked: true });
    }
  },

  //metodo login - guarda token en cookie
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      document.cookie = `token=${data.token}; path=/; max-age=86400`;

      set({
        userId: data.user_id,
        token: data.token,
        authStatus: "authenticated",
        isChecked: true,
      });
      return true;
    } catch (error) {
      console.log(error);
      get().logout();
      return false;
    }
  },

  //metodo logout - define valores nulos y elimina token de la cookie
  logout: () => {
    document.cookie = "token=; path=/; max-age=0";
    set({
      userId: null,
      token: null,
      authStatus: "not-authenticated",
      isChecked: true,
    });
  },
}));
