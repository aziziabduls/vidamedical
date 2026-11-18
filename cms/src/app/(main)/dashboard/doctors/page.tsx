import type { Metadata } from "next";

import { DoctorsManager } from "./_components/doctors-manager";

export const metadata: Metadata = {
  title: "Dokter & Poli | Vida Medical CMS",
  description: "Kelola data dokter dan jadwal poliklinik spesialis Vida Medical Centre.",
};

export default function Page() {
  return <DoctorsManager />;
}
