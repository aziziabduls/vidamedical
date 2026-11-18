import type { ReactNode } from "react";

import { Stethoscope } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config/app-config";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="bg-primary relative order-2 hidden h-full rounded-3xl lg:flex">
          <div className="text-primary-foreground absolute top-10 space-y-2 px-10">
            <Stethoscope className="size-10" />
            <h1 className="text-2xl font-medium">{APP_CONFIG.name}</h1>
            <p className="text-sm opacity-90">
              Panel manajemen konten Promo Highlight, Healthpedia, Dokter &amp; Poli, dan Layanan Medis.
            </p>
          </div>

          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="text-primary-foreground flex-1 space-y-1">
              <h2 className="font-medium">Gedung The Vida</h2>
              <p className="text-sm opacity-85">Jl. Perjuangan No. 8, Kebon Jeruk, Jakarta Barat.</p>
            </div>
            <Separator orientation="vertical" className="mx-4 h-auto! opacity-30" />
            <div className="text-primary-foreground flex-1 space-y-1">
              <h2 className="font-medium">REST API Terintegrasi</h2>
              <p className="text-sm opacity-85">Express.js + Prisma + PostgreSQL.</p>
            </div>
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
