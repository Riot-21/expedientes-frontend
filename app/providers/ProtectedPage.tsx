"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../login/store/auth.store";
import { CustomFullScreenLoading } from "../custom/CustomFullScreenLoading";

//"middleware" extra
export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus, token, isChecked, checkAuth } = useAuthStore();
  const router = useRouter();

  //ejecuta checkauth cuando se renderiza el componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //useEffect para reaccionar al resultado de checkAuth
  useEffect(() => {
    //espera a que isChecked === true, sino esta checkeado no se ejecuta nada
    if (!isChecked) return;

    // si no esta autenticado o no hay token manda a /login
    if (authStatus === "not-authenticated" || !token) {
      router.replace("/login");
    }
  }, [isChecked, authStatus, token, router]);

  //mientras no esta checkeado muestra pantalla de carga
  if (!isChecked || authStatus === "checking") {
    return <CustomFullScreenLoading></CustomFullScreenLoading>;
  }

  return <>{children}</>;
}
