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

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isChecked) return;

    if (authStatus === "not-authenticated" || !token) {
      router.replace("/login");
    }
  }, [isChecked, authStatus, token, router]);

  if (!isChecked || authStatus === "checking") {
    return <CustomFullScreenLoading></CustomFullScreenLoading>;
  }

  return <>{children}</>;
}
