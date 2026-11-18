import type { Metadata } from "next";

import { ArticleEditor } from "../_components/article-editor";

export const metadata: Metadata = {
  title: "Buat Artikel | Vida Medical CMS",
  description: "Tambah artikel edukasi medis Healthpedia baru.",
};

export default function Page() {
  return <ArticleEditor mode="create" />;
}
