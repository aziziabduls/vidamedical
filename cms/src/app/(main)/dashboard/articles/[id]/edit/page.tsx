import type { Metadata } from "next";

import { ArticleEditor } from "../../_components/article-editor";

export const metadata: Metadata = {
  title: "Edit Artikel | Vida Medical CMS",
  description: "Ubah konten artikel edukasi medis Healthpedia.",
};

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: EditArticlePageProps) {
  const { id } = await params;
  return <ArticleEditor mode="edit" articleId={id} />;
}
