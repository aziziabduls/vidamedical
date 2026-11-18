import type { Metadata } from "next";

import { ArticlesManager } from "./_components/articles-manager";

export const metadata: Metadata = {
  title: "Artikel Healthpedia | Vida Medical CMS",
  description: "Kelola artikel edukasi medis Healthpedia Vida Medical Centre.",
};

export default function Page() {
  return <ArticlesManager />;
}
