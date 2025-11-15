import { create } from "zustand";
import { loginAction } from "../actions/login.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  userId: string | null;
  token: string | null;
  authStatus: AuthStatus;
  isChecked: boolean;

  checkAuth: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  userId: null,
  token: null,
  authStatus: "checking",
  isChecked: false,

  checkAuth: () => {
    const token = localStorage.getItem("token");
    if(!token){
      set({token: null, authStatus: "not-authenticated", isChecked: true});
      return;
    }else{
      set({token: token, authStatus: "authenticated", isChecked: true});

    }

  },

  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);

      set({
        userId: data.user_id,
        token: data.token,
        authStatus: "authenticated",
        isChecked: true
      });
      return true;
    } catch (error) {
      console.log(error);
      get().logout();
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ userId: null, token: null, authStatus: "not-authenticated", isChecked: true});
  },
}));
