"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../login/store/auth.store";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus, token, isChecked, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isChecked) return;

    if (authStatus === "not-authenticated" || !token) {
      router.push("/login");
    }
  }, [isChecked, authStatus, token, router]);

  if (!isChecked || authStatus === "checking") {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
