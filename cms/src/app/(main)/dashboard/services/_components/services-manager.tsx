"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  createService,
  deleteService,
  listServices,
  type ServiceCategory,
  type ServicePackage,
  updateService,
} from "@/lib/api";

const SERVICE_CATEGORIES: Array<{ value: ServiceCategory; label: string }> = [
  { value: "vidaboost", label: "VidaBoost" },
  { value: "vidahealth", label: "VidaHealth" },
  { value: "vidafit", label: "VidaFit" },
  { value: "homecare", label: "Homecare" },
  { value: "lab", label: "Laboratorium" },
  { value: "vaksinasi", label: "Vaksinasi" },
  { value: "coe", label: "Pusat Unggulan" },
];

interface ServiceFormState {
  category: ServiceCategory;
  name: string;
  slug: string;
  subtitle: string;
  tagline: string;
  priceLabel: string;
  durationMinutes: string;
  badge: string;
  description: string;
  featuresText: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_FORM: ServiceFormState = {
  category: "vidaboost",
  name: "",
  slug: "",
  subtitle: "",
  tagline: "",
  priceLabel: "",
  durationMinutes: "",
  badge: "",
  description: "",
  featuresText: "",
  sortOrder: 0,
  isActive: true,
};

export function ServicesManager() {
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listServices();
      setServices(data);
    } catch (error) {
      toast.add({
        title: "Gagal memuat paket layanan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadServices();
  }, [loadServices]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return services;
    return services.filter((svc) => svc.category === activeTab);
  }, [services, activeTab]);

  const openCreate = () => {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      category: activeTab !== "all" ? (activeTab as ServiceCategory) : "vidaboost",
      sortOrder: filtered.length,
    });
    setDialogOpen(true);
  };

  const openEdit = (svc: ServicePackage) => {
    setEditingId(svc.id);
    setForm({
      category: svc.category,
      name: svc.name,
      slug: svc.slug,
      subtitle: svc.subtitle ?? "",
      tagline: svc.tagline ?? "",
      priceLabel: svc.priceLabel ?? "",
      durationMinutes: svc.durationMinutes ? String(svc.durationMinutes) : "",
      badge: svc.badge ?? "",
      description: svc.description,
      featuresText: svc.features.join("\n"),
      sortOrder: svc.sortOrder,
      isActive: svc.isActive,
    });
    setDialogOpen(true);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const features = form.featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!form.name.trim() || !form.description.trim()) {
      toast.add({ title: "Nama layanan dan deskripsi wajib diisi", type: "error" });
      return;
    }

    setSaving(true);
    try {
      const durationValue = form.durationMinutes.trim() ? Number(form.durationMinutes) : null;
      const payload = {
        category: form.category,
        name: form.name.trim(),
        ...(form.slug.trim() ? { slug: form.slug.trim() } : {}),
        subtitle: form.subtitle.trim() || null,
        tagline: form.tagline.trim() || null,
        priceLabel: form.priceLabel.trim() || null,
        durationMinutes: durationValue && Number.isFinite(durationValue) ? durationValue : null,
        badge: form.badge.trim() || null,
        description: form.description.trim(),
        features,
        sortOrder: Number(form.sortOrder) || 0,
        isActive: form.isActive,
      };

      if (editingId) {
        await updateService(editingId, payload);
        toast.add({ title: "Layanan diperbarui", type: "success" });
      } else {
        await createService(payload);
        toast.add({ title: "Layanan ditambahkan", type: "success" });
      }

      setDialogOpen(false);
      await loadServices();
    } catch (error) {
      toast.add({
        title: "Gagal menyimpan layanan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (svc: ServicePackage, nextActive: boolean) => {
    try {
      await updateService(svc.id, { isActive: nextActive });
      setServices((prev) => prev.map((item) => (item.id === svc.id ? { ...item, isActive: nextActive } : item)));
      toast.add({ title: nextActive ? "Layanan diaktifkan" : "Layanan dinonaktifkan", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal mengubah status",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const handleDelete = async (svc: ServicePackage) => {
    if (!window.confirm(`Hapus layanan "${svc.name}"?`)) return;
    try {
      await deleteService(svc.id);
      setServices((prev) => prev.filter((item) => item.id !== svc.id));
      toast.add({ title: "Layanan dihapus", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal menghapus layanan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-normal tracking-tight">Layanan Kami</h1>
          <p className="text-muted-foreground text-sm">
            Kelola paket VidaBoost, VidaHealth MCU, VidaFit, Homecare, Laboratorium, dan Pusat Layanan Unggulan.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus />
          Tambah Paket Layanan
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="all">Semua</TabsTrigger>
          {SERVICE_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            Belum ada paket pada kategori ini.
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paket Layanan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tarif / Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((svc) => (
                <TableRow key={svc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{svc.name}</span>
                      {svc.badge && <Badge variant="secondary">{svc.badge}</Badge>}
                    </div>
                    {svc.tagline && <div className="text-muted-foreground text-xs">{svc.tagline}</div>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {SERVICE_CATEGORIES.find((cat) => cat.value === svc.category)?.label ?? svc.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium tabular-nums">{svc.priceLabel || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={svc.isActive}
                        onCheckedChange={(checked) => handleToggleActive(svc, Boolean(checked))}
                        aria-label={`Aktifkan ${svc.name}`}
                      />
                      <span className="text-xs">{svc.isActive ? "Aktif" : "Nonaktif"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(svc)}>
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(svc)}
                        aria-label={`Hapus ${svc.name}`}
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
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Paket Layanan" : "Tambah Paket Layanan"}</DialogTitle>
            <DialogDescription>Masukkan detail paket, tarif, durasi, serta daftar manfaat layanan.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Kategori</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => {
                    if (value !== null) setForm((p) => ({ ...p, category: value as ServiceCategory }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{form.category}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="svc-name">{form.category === "coe" ? "Judul Pusat Unggulan" : "Nama Paket"}</Label>
                <Input
                  id="svc-name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="svc-subtitle">
                  {form.category === "coe" ? "Kategori Klinik" : "Sub-judul (opsional)"}
                </Label>
                <Input
                  id="svc-subtitle"
                  value={form.subtitle}
                  onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                  placeholder={form.category === "coe" ? "Infus Vitamin & Mikronutrien" : "Opsional"}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="svc-price">{form.category === "coe" ? "Lokasi Unit" : "Label Harga"}</Label>
                <Input
                  id="svc-price"
                  value={form.priceLabel}
                  onChange={(e) => setForm((p) => ({ ...p, priceLabel: e.target.value }))}
                  placeholder={form.category === "coe" ? "Lounge Mezzanine, Gedung The Vida" : "Rp 750.000"}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="svc-duration">Durasi (menit)</Label>
                <Input
                  id="svc-duration"
                  type="number"
                  min={1}
                  value={form.durationMinutes}
                  onChange={(e) => setForm((p) => ({ ...p, durationMinutes: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="svc-tagline">{form.category === "coe" ? "Keunggulan / Highlight" : "Tagline"}</Label>
                <Input
                  id="svc-tagline"
                  value={form.tagline}
                  onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                  placeholder={form.category === "coe" ? "100% Bahan Medis Resmi BPOM" : ""}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="svc-badge">Badge (opsional)</Label>
                <Input
                  id="svc-badge"
                  value={form.badge}
                  onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
                  placeholder="Paling Populer"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="svc-desc">Deskripsi</Label>
              <Textarea
                id="svc-desc"
                rows={2}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="svc-features">
                {form.category === "coe"
                  ? "Prosedur & Cakupan Layanan (1 poin per baris)"
                  : "Rincian / Nutrisi (1 poin per baris)"}
              </Label>
              <Textarea
                id="svc-features"
                rows={3}
                value={form.featuresText}
                onChange={(e) => setForm((p) => ({ ...p, featuresText: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="svc-active" className="cursor-pointer">
                Tampilkan paket layanan
              </Label>
              <Switch
                id="svc-active"
                checked={form.isActive}
                onCheckedChange={(checked) => setForm((p) => ({ ...p, isActive: Boolean(checked) }))}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
