import type { Metadata } from "next";

import { CmsOverview } from "./_components/cms-overview";

export const metadata: Metadata = {
  title: "Overview | Vida Medical CMS",
  description: "Ringkasan modul konten Vida Medical Centre.",
};

export default function Page() {
  return <CmsOverview />;
}
