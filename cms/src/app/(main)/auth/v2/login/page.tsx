import { APP_CONFIG } from "@/config/app-config";

import { LoginForm } from "../../_components/login-form";

export default function LoginV2() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-6 sm:w-[380px]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-medium tracking-tight">Masuk ke {APP_CONFIG.name}</h1>
          <p className="text-muted-foreground text-sm">
            Gunakan akun administrator untuk mengelola konten website Vida Medical Centre.
          </p>
        </div>

        <LoginForm />

        <p className="text-muted-foreground text-center text-xs">
          Default seed admin: <span className="font-mono">admin@vidamedical.id</span>
        </p>
      </div>

      <div className="absolute bottom-5 flex w-full justify-center px-10">
        <div className="text-muted-foreground text-xs">{APP_CONFIG.copyright}</div>
      </div>
    </>
  );
}
