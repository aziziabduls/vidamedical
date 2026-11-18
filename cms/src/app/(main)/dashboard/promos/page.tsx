import type { Metadata } from "next";

import { PromosManager } from "./_components/promos-manager";

export const metadata: Metadata = {
  title: "Promo Highlight | Vida Medical CMS",
  description: "Kelola banner gambar carousel Promo Highlight.",
};

export default function Page() {
  return <PromosManager />;
}
