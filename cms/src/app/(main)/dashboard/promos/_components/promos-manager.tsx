"use client";

import { useCallback, useEffect, useState } from "react";

import { Plus, Trash2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import {
  createPromo,
  deletePromo,
  listPromos,
  type Promo,
  resolveMediaUrl,
  updatePromo,
  uploadImageFile,
} from "@/lib/api";

interface PromoFormState {
  title: string;
  imageUrl: string;
  imageAlt: string;
  linkUrl: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_FORM: PromoFormState = {
  title: "",
  imageUrl: "",
  imageAlt: "",
  linkUrl: "",
  sortOrder: 0,
  isActive: true,
};

export function PromosManager() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PromoFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadPromos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listPromos();
      setPromos(data);
    } catch (error) {
      toast.add({
        title: "Gagal memuat promo",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPromos();
  }, [loadPromos]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, sortOrder: promos.length });
    setDialogOpen(true);
  };

  const openEdit = (promo: Promo) => {
    setEditingId(promo.id);
    setForm({
      title: promo.title,
      imageUrl: promo.imageUrl,
      imageAlt: promo.imageAlt,
      linkUrl: promo.linkUrl ?? "",
      sortOrder: promo.sortOrder,
      isActive: promo.isActive,
    });
    setDialogOpen(true);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageFile(file);
      setForm((prev) => ({ ...prev, imageUrl: res.url }));
      toast.add({ title: "Gambar berhasil diunggah", type: "success" });
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

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.imageUrl.trim()) {
      toast.add({ title: "Judul dan URL gambar wajib diisi", type: "error" });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        imageUrl: form.imageUrl.trim(),
        imageAlt: form.imageAlt.trim() || form.title.trim(),
        linkUrl: form.linkUrl.trim() || null,
        sortOrder: Number(form.sortOrder) || 0,
        isActive: form.isActive,
      };

      if (editingId) {
        await updatePromo(editingId, payload);
        toast.add({ title: "Promo diperbarui", type: "success" });
      } else {
        await createPromo(payload);
        toast.add({ title: "Promo ditambahkan", type: "success" });
      }
      setDialogOpen(false);
      await loadPromos();
    } catch (error) {
      toast.add({
        title: "Gagal menyimpan promo",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (promo: Promo, nextActive: boolean) => {
    try {
      await updatePromo(promo.id, { isActive: nextActive });
      setPromos((prev) => prev.map((item) => (item.id === promo.id ? { ...item, isActive: nextActive } : item)));
      toast.add({ title: nextActive ? "Promo diaktifkan" : "Promo dinonaktifkan", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal mengubah status",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const handleDelete = async (promo: Promo) => {
    if (!window.confirm(`Hapus promo "${promo.title}"?`)) return;
    try {
      await deletePromo(promo.id);
      setPromos((prev) => prev.filter((item) => item.id !== promo.id));
      toast.add({ title: "Promo dihapus", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal menghapus promo",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-normal tracking-tight">Promo Highlight</h1>
          <p className="text-muted-foreground text-sm">
            Atur daftar gambar banner carousel yang tampil di bawah Hero website utama.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus />
          Tambah Promo
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : promos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            Belum ada promo. Klik &ldquo;Tambah Promo&rdquo; untuk menambahkan banner pertama.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {promos.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <div className="bg-muted relative aspect-[21/9] w-full overflow-hidden border-b">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveMediaUrl(promo.imageUrl)}
                  alt={promo.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-base">{promo.title}</CardTitle>
                  <p className="text-muted-foreground text-xs font-mono">{promo.imageUrl}</p>
                </div>
                <Badge variant={promo.isActive ? "default" : "secondary"}>
                  {promo.isActive ? "Aktif" : "Nonaktif"}
                </Badge>
              </CardHeader>
              <CardFooter className="flex items-center justify-between gap-2 border-t pt-4">
                <div className="flex items-center gap-2 text-xs">
                  <Switch
                    checked={promo.isActive}
                    onCheckedChange={(checked) => handleToggleActive(promo, Boolean(checked))}
                    aria-label={`Aktifkan ${promo.title}`}
                  />
                  <span className="text-muted-foreground">Urutan #{promo.sortOrder}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(promo)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="icon-sm" onClick={() => handleDelete(promo)} aria-label="Hapus">
                    <Trash2 />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Promo Highlight" : "Tambah Promo Highlight"}</DialogTitle>
            <DialogDescription>
              Unggah gambar banner (rasio 16:9 / 21:9) atau masukkan path URL gambar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="promo-title">Judul Promo</Label>
              <Input
                id="promo-title"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Contoh: Promo MCU Awal Tahun"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="promo-image-url">URL / Path Gambar</Label>
              <div className="flex gap-2">
                <Input
                  id="promo-image-url"
                  value={form.imageUrl}
                  onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                  placeholder="/uploads/... atau /images/vida_promo.jpeg"
                  required
                />
                <Label
                  htmlFor="promo-file-upload"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-medium"
                >
                  <Upload className="size-3.5" />
                  <span>{uploading ? "Mengunggah..." : "Upload"}</span>
                </Label>
                <input
                  id="promo-file-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="promo-alt">Alt Text Gambar</Label>
                <Input
                  id="promo-alt"
                  value={form.imageAlt}
                  onChange={(e) => setForm((p) => ({ ...p, imageAlt: e.target.value }))}
                  placeholder="Deskripsi gambar"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="promo-order">Urutan Tampil</Label>
                <Input
                  id="promo-order"
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="promo-active" className="cursor-pointer">
                Tampilkan di carousel homepage
              </Label>
              <Switch
                id="promo-active"
                checked={form.isActive}
                onCheckedChange={(checked) => setForm((p) => ({ ...p, isActive: Boolean(checked) }))}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={saving || uploading}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
