"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";
import { type AdminUser, getAdminProfile } from "@/lib/api";

const AuthContext = createContext<AdminUser | null>(null);

export function useAuthUser() {
  return useContext(AuthContext);
}

export function AuthGuard({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    getAdminProfile()
      .then((profile) => {
        if (!active) return;
        setUser(profile);
        setChecking(false);
      })
      .catch(() => {
        if (!active) return;
        router.replace("/auth/v2/login");
      });

    return () => {
      active = false;
    };
  }, [router]);

  if (checking || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        <span>Memverifikasi sesi admin…</span>
      </div>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
