"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowUpDown, Plus, Save, Trash2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  type ArticleCategory,
  createArticle,
  createArticleCategory,
  getArticle,
  listArticleCategories,
  resolveMediaUrl,
  updateArticle,
  uploadImageFile,
} from "@/lib/api";

interface EditableSection {
  uid: string;
  heading: string;
  bodyText: string;
}

interface ArticleEditorProps {
  mode: "create" | "edit";
  articleId?: string;
}

const BOOKING_CATEGORIES = [
  { value: "vidafit", label: "VidaFit (Gizi Klinis)" },
  { value: "vidaboost", label: "VidaBoost (IV Therapy)" },
  { value: "vidahealth", label: "VidaHealth (MCU)" },
  { value: "homecare", label: "Vida at Home (Homecare)" },
  { value: "vaksinasi", label: "VidaShield (Vaksinasi)" },
] as const;

function makeEmptySection(): EditableSection {
  return {
    uid: crypto.randomUUID(),
    heading: "",
    bodyText: "",
  };
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ArticleEditor({ mode, articleId }: ArticleEditorProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Nutrisi & Gizi Klinis");
  const [author, setAuthor] = useState("dr. Spesialis Gizi Klinis (Sp.GK)");
  const [authorCredential, setAuthorCredential] = useState("Tim Medis Vida Medical Centre · Gedung The Vida");
  const [dateLabel, setDateLabel] = useState(() =>
    new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
  );
  const [readTime, setReadTime] = useState("4 menit baca");
  const [snippet, setSnippet] = useState("");
  const [paragraphsText, setParagraphsText] = useState("");
  const [sections, setSections] = useState<EditableSection[]>([makeEmptySection()]);
  const [keyPointsText, setKeyPointsText] = useState("");
  const [clinicalNote, setClinicalNote] = useState("");
  const [bookingCategory, setBookingCategory] = useState("vidafit");
  const [bookingOption, setBookingOption] = useState("Program Evaluasi VidaFit (Dokter Sp.GK)");
  const [isPublished, setIsPublished] = useState(true);

  const loadInitialData = useCallback(async () => {
    try {
      const catList = await listArticleCategories();
      setCategories(catList);

      if (mode === "create") {
        if (catList.length > 0) {
          setCategory(catList[0].name);
        }
        return;
      }

      if (mode === "edit" && articleId) {
        const article = await getArticle(articleId);
        setTitle(article.title);
        setSlug(article.slug);
        setImageUrl(article.imageUrl ?? "");
        setCategory(article.category);
        setAuthor(article.author);
        setAuthorCredential(article.authorCredential ?? "");
        setDateLabel(article.dateLabel);
        setReadTime(article.readTime);
        setSnippet(article.snippet);
        setParagraphsText(article.content.join("\n\n"));
        setSections(
          article.sections && article.sections.length > 0
            ? article.sections.map((sec) => ({
                uid: crypto.randomUUID(),
                heading: sec.heading,
                bodyText: sec.body.join("\n\n"),
              }))
            : [makeEmptySection()],
        );
        setKeyPointsText(article.keyTakeaways.join("\n"));
        setClinicalNote(article.clinicalNote ?? "");
        setBookingCategory(article.bookingCategory ?? "vidafit");
        setBookingOption(article.bookingOption ?? "");
        setIsPublished(article.isPublished);
      }
    } catch (error) {
      toast.add({
        title: "Gagal memuat data artikel",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [articleId, mode]);

  useEffect(() => {
    void loadInitialData();
  }, [loadInitialData]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageFile(file);
      setImageUrl(res.url);
      toast.add({ title: "Gambar artikel berhasil diunggah", type: "success" });
    } catch (error) {
      toast.add({
        title: "Upload gagal",
        description: error instanceof Error ? error.message : "Gagal mengunggah gambar",
        type: "error",
      });
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleAddCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    setAddingCategory(true);
    try {
      const created = await createArticleCategory({ name: trimmed, sortOrder: categories.length });
      setCategories((prev) => [...prev, created]);
      setCategory(created.name);
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

  const updateSection = (uid: string, patch: Partial<EditableSection>) => {
    setSections((prev) => prev.map((sec) => (sec.uid === uid ? { ...sec, ...patch } : sec)));
  };

  const moveSection = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= sections.length) return;
    setSections((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(index, 1);
      copy.splice(target, 0, moved);
      return copy;
    });
  };

  const removeSection = (uid: string) => {
    setSections((prev) => (prev.length > 1 ? prev.filter((sec) => sec.uid !== uid) : prev));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const content = splitParagraphs(paragraphsText);
    const keyTakeaways = keyPointsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const parsedSections = sections
      .map((sec) => ({
        heading: sec.heading.trim(),
        body: splitParagraphs(sec.bodyText),
      }))
      .filter((sec) => sec.heading.length > 0 && sec.body.length > 0);

    if (!title.trim() || !snippet.trim() || content.length === 0) {
      toast.add({
        title: "Judul, ringkasan, dan minimal 1 paragraf pembuka wajib diisi",
        type: "error",
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        ...(slug.trim() ? { slug: slug.trim() } : {}),
        category,
        snippet: snippet.trim(),
        author: author.trim(),
        authorCredential: authorCredential.trim() || null,
        dateLabel: dateLabel.trim() || undefined,
        readTime: readTime.trim() || "4 menit baca",
        imageUrl: imageUrl.trim() || null,
        content,
        sections: parsedSections.length > 0 ? parsedSections : null,
        keyTakeaways,
        clinicalNote: clinicalNote.trim() || null,
        bookingCategory: bookingCategory || null,
        bookingOption: bookingOption.trim() || null,
        isPublished,
      };

      if (mode === "edit" && articleId) {
        await updateArticle(articleId, payload);
        toast.add({ title: "Artikel berhasil diperbarui", type: "success" });
      } else {
        await createArticle(payload);
        toast.add({ title: "Artikel berhasil dibuat", type: "success" });
      }

      router.push("/dashboard/articles");
    } catch (error) {
      toast.add({
        title: "Gagal menyimpan artikel",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 mb-1"
            nativeButton={false}
            render={<Link href="/dashboard/articles" />}
          >
            <ArrowLeft className="size-4" />
            Kembali ke Daftar Artikel
          </Button>
          <h1 className="text-3xl font-normal tracking-tight">
            {mode === "edit" ? "Edit Artikel Healthpedia" : "Buat Artikel Healthpedia"}
          </h1>
          <p className="text-muted-foreground text-sm">
            Struktur artikel mengikuti format edukasi medis Healthpedia (paragraf pembuka, sub-bagian terstruktur, poin
            penting, dan catatan dokter).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" nativeButton={false} render={<Link href="/dashboard/articles" />}>
            Batal
          </Button>
          <Button type="submit" disabled={saving || uploading}>
            <Save className="size-4" />
            {saving ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Publikasikan Artikel"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informasi Utama Artikel</CardTitle>
              <CardDescription>Judul, ringkasan singkat, dan paragraf pembuka artikel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="article-title">Judul Artikel</Label>
                <Input
                  id="article-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Mengapa Pembatasan Kalori Ekstrem Justru Menurunkan Laju Metabolisme?"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="article-slug">Slug URL (opsional)</Label>
                <Input
                  id="article-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="otomatis-dibuat-dari-judul"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="article-snippet">Ringkasan / Snippet</Label>
                <Textarea
                  id="article-snippet"
                  rows={2}
                  value={snippet}
                  onChange={(e) => setSnippet(e.target.value)}
                  placeholder="Ringkasan singkat 1–2 kalimat yang tampil pada kartu artikel."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="article-paragraphs">Paragraf Pembuka (pisahkan paragraf dengan Enter 2x)</Label>
                <Textarea
                  id="article-paragraphs"
                  rows={5}
                  value={paragraphsText}
                  onChange={(e) => setParagraphsText(e.target.value)}
                  placeholder="Paragraf pembuka pertama...&#10;&#10;Paragraf pembuka kedua..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Bagian Pembahasan Terstruktur</CardTitle>
                <CardDescription>Sub-judul dan isi pembahasan untuk daftar isi halaman detail artikel.</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSections((prev) => [...prev, makeEmptySection()])}
              >
                <Plus className="size-3.5" />
                Tambah Bagian
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, idx) => (
                <div key={section.uid} className="space-y-3 rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground text-xs font-medium">Bagian #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={idx === 0}
                        onClick={() => moveSection(idx, -1)}
                        aria-label="Naikkan urutan"
                      >
                        <ArrowUpDown className="size-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={sections.length <= 1}
                        onClick={() => removeSection(section.uid)}
                        aria-label="Hapus bagian"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor={`sec-heading-${section.uid}`}>Judul Sub-Bagian</Label>
                    <Input
                      id={`sec-heading-${section.uid}`}
                      value={section.heading}
                      onChange={(e) => updateSection(section.uid, { heading: e.target.value })}
                      placeholder="Contoh: Mekanisme Adaptasi Termogenik Tubuh"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor={`sec-body-${section.uid}`}>
                      Isi Sub-Bagian (pisahkan paragraf dengan Enter 2x)
                    </Label>
                    <Textarea
                      id={`sec-body-${section.uid}`}
                      rows={4}
                      value={section.bodyText}
                      onChange={(e) => updateSection(section.uid, { bodyText: e.target.value })}
                      placeholder="Isi pembahasan sub-bagian..."
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Poin Penting &amp; Catatan Dokter</CardTitle>
              <CardDescription>Ringkasan poin klinis dan catatan rekomendasi dokter.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="article-keypoints">Poin Penting Klinis (1 poin per baris)</Label>
                <Textarea
                  id="article-keypoints"
                  rows={4}
                  value={keyPointsText}
                  onChange={(e) => setKeyPointsText(e.target.value)}
                  placeholder="Defisit kalori ideal berkisar 300–500 kkal/hari...&#10;Asupan protein terukur membantu mempertahankan massa otot..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="article-clinical-note">Catatan Dokter</Label>
                <Textarea
                  id="article-clinical-note"
                  rows={2}
                  value={clinicalNote}
                  onChange={(e) => setClinicalNote(e.target.value)}
                  placeholder="Jadwalkan evaluasi nutrisi bersama Dokter Spesialis Gizi Klinis (Sp.GK)..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gambar Artikel (Cover)</CardTitle>
              <CardDescription>Unggah gambar cover (JPEG/PNG/WebP/AVIF, maks 5 MB) atau isi URL.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {imageUrl && (
                <div className="bg-muted relative aspect-[16/9] w-full overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveMediaUrl(imageUrl)}
                    alt={title || "Cover artikel"}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    onClick={() => setImageUrl("")}
                    aria-label="Hapus gambar"
                    className="absolute top-2 right-2"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  id="article-image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/uploads/... atau URL gambar"
                />
                <Label
                  htmlFor="article-file-upload"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-medium"
                >
                  <Upload className="size-3.5" />
                  <span>{uploading ? "Mengunggah..." : "Upload"}</span>
                </Label>
                <input
                  id="article-file-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Kategori &amp; Publikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Kategori Artikel</Label>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    if (value !== null) setCategory(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{category}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-cat-name">Tambah Kategori Baru</Label>
                <div className="flex gap-2">
                  <Input
                    id="new-cat-name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Contoh: Kesehatan Anak"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={addingCategory || !newCategoryName.trim()}
                    onClick={handleAddCategory}
                  >
                    Tambah
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor="article-published" className="cursor-pointer">
                  Publikasikan di website
                </Label>
                <Switch
                  id="article-published"
                  checked={isPublished}
                  onCheckedChange={(checked) => setIsPublished(Boolean(checked))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Penulis &amp; Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="article-author">Penulis / Peninjau Medis</Label>
                <Input id="article-author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="article-credential">Kredensial / Unit</Label>
                <Input
                  id="article-credential"
                  value={authorCredential}
                  onChange={(e) => setAuthorCredential(e.target.value)}
                  placeholder="Tim Gizi Klinis VidaFit · Gedung The Vida"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="article-date">Tanggal</Label>
                  <Input id="article-date" value={dateLabel} onChange={(e) => setDateLabel(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="article-readtime">Waktu Baca</Label>
                  <Input id="article-readtime" value={readTime} onChange={(e) => setReadTime(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tombol Konsultasi Terkait</CardTitle>
              <CardDescription>Layanan default saat pembaca klik tombol konsultasi di artikel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Kategori Layanan</Label>
                <Select
                  value={bookingCategory}
                  onValueChange={(value) => {
                    if (value !== null) setBookingCategory(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{bookingCategory}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {BOOKING_CATEGORIES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="article-booking-option">Paket / Opsi Default</Label>
                <Input
                  id="article-booking-option"
                  value={bookingOption}
                  onChange={(e) => setBookingOption(e.target.value)}
                  placeholder="VidaBoost Gold / VidaHealth Comprehensive"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
