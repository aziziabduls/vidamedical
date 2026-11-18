import type { Metadata } from "next";

import { ServicesManager } from "./_components/services-manager";

export const metadata: Metadata = {
  title: "Layanan Kami | Vida Medical CMS",
  description: "Kelola paket layanan VidaBoost, VidaHealth, VidaFit, Homecare, dan Laboratorium.",
};

export default function Page() {
  return <ServicesManager />;
}
