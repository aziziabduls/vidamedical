"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { Plus, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import {
  type Article,
  type ArticleCategory,
  createArticleCategory,
  deleteArticle,
  deleteArticleCategory,
  listArticleCategories,
  listArticles,
  updateArticle,
} from "@/lib/api";

export function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [articleList, categoryList] = await Promise.all([listArticles(), listArticleCategories()]);
      setArticles(articleList);
      setCategories(categoryList);
    } catch (error) {
      toast.add({
        title: "Gagal memuat artikel",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((art) => {
      const matchesCat = categoryFilter === "Semua" || art.category === categoryFilter;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        art.title.toLowerCase().includes(q) ||
        art.author.toLowerCase().includes(q) ||
        art.slug.toLowerCase().includes(q)
      );
    });
  }, [articles, search, categoryFilter]);

  const handleTogglePublished = async (article: Article, nextPublished: boolean) => {
    try {
      await updateArticle(article.id, { isPublished: nextPublished });
      setArticles((prev) =>
        prev.map((item) => (item.id === article.id ? { ...item, isPublished: nextPublished } : item)),
      );
      toast.add({ title: nextPublished ? "Artikel dipublikasikan" : "Artikel dijadikan draft", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal mengubah status",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const handleDelete = async (article: Article) => {
    if (!window.confirm(`Hapus artikel "${article.title}"?`)) return;
    try {
      await deleteArticle(article.id);
      setArticles((prev) => prev.filter((item) => item.id !== article.id));
      toast.add({ title: "Artikel dihapus", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal menghapus artikel",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const handleAddCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    setAddingCategory(true);
    try {
      const created = await createArticleCategory({ name: trimmed, sortOrder: categories.length });
      setCategories((prev) => [...prev, created]);
      setNewCategoryName("");
      toast.add({ title: `Kategori "${created.name}" ditambahkan`, type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal menambah kategori",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setAddingCategory(false);
    }
  };

  const handleDeleteCategory = async (cat: ArticleCategory) => {
    if (!window.confirm(`Hapus kategori "${cat.name}"?`)) return;
    try {
      await deleteArticleCategory(cat.id);
      setCategories((prev) => prev.filter((item) => item.id !== cat.id));
      if (categoryFilter === cat.name) setCategoryFilter("Semua");
      toast.add({ title: "Kategori dihapus", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal menghapus kategori",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Skeleton className="h-64 w-full rounded-xl" />;
    }

    if (filtered.length === 0) {
      return (
        <Card>
          <CardContent className="text-muted-foreground py-12 text-center text-sm">
            Tidak ada artikel yang ditemukan.
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((art) => (
              <TableRow key={art.id}>
                <TableCell className="max-w-sm">
                  <div className="truncate font-medium">{art.title}</div>
                  <div className="text-muted-foreground truncate font-mono text-xs">/{art.slug}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{art.category}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">{art.author}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={art.isPublished}
                      onCheckedChange={(checked) => handleTogglePublished(art, Boolean(checked))}
                      aria-label={`Publikasikan ${art.title}`}
                    />
                    <span className="text-xs">{art.isPublished ? "Terbit" : "Draft"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<Link href={`/dashboard/articles/${art.id}/edit`} />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => handleDelete(art)}
                      aria-label={`Hapus ${art.title}`}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-normal tracking-tight">Artikel Healthpedia</h1>
          <p className="text-muted-foreground text-sm">
            Kelola artikel edukasi medis dan kategori Healthpedia yang tampil di website Vida Medical Centre.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/dashboard/articles/new" />}>
          <Plus />
          Tambah Artikel
        </Button>
      </div>

      {/* Category management strip */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Kategori Artikel</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="gap-1.5 pr-1">
                <span>{cat.name}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat)}
                  aria-label={`Hapus kategori ${cat.name}`}
                  className="text-muted-foreground hover:text-foreground rounded-full px-1 text-xs cursor-pointer"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <form onSubmit={handleAddCategory} className="flex shrink-0 gap-2">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Tambah kategori baru…"
              className="w-52"
            />
            <Button type="submit" variant="outline" size="sm" disabled={addingCategory || !newCategoryName.trim()}>
              Tambah
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul atau penulis…"
            className="pl-8"
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(value) => {
            if (value !== null) setCategoryFilter(value);
          }}
        >
          <SelectTrigger className="w-56">
            <SelectValue>{categoryFilter === "Semua" ? "Semua Kategori" : categoryFilter}</SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="Semua">Semua Kategori</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {renderContent()}
    </div>
  );
}
