"use client";

import { useCallback, useEffect, useState } from "react";

import { Plus, Trash2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { createDoctor, type Doctor, deleteDoctor, listDoctors, updateDoctor } from "@/lib/api";

interface DoctorFormState {
  name: string;
  poliCode: string;
  poliName: string;
  specialistTag: string;
  schedule: string;
  location: string;
  description: string;
  focusAreasText: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_FORM: DoctorFormState = {
  name: "",
  poliCode: "sp-pd",
  poliName: "Poli Penyakit Dalam",
  specialistTag: "Dokter Spesialis Penyakit Dalam",
  schedule: "Senin – Sabtu · 08.00 – 20.00 WIB",
  location: "Poliklinik Lantai 6, Gedung The Vida",
  description: "",
  focusAreasText: "",
  sortOrder: 0,
  isActive: true,
};

export function DoctorsManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<DoctorFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const loadDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listDoctors();
      setDoctors(data);
    } catch (error) {
      toast.add({
        title: "Gagal memuat data dokter & poli",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDoctors();
  }, [loadDoctors]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, sortOrder: doctors.length });
    setDialogOpen(true);
  };

  const openEdit = (doc: Doctor) => {
    setEditingId(doc.id);
    setForm({
      name: doc.name,
      poliCode: doc.poliCode,
      poliName: doc.poliName,
      specialistTag: doc.specialistTag,
      schedule: doc.schedule,
      location: doc.location,
      description: doc.description,
      focusAreasText: doc.focusAreas.join("\n"),
      sortOrder: doc.sortOrder,
      isActive: doc.isActive,
    });
    setDialogOpen(true);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const focusAreas = form.focusAreasText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!form.name.trim() || !form.poliName.trim() || !form.description.trim()) {
      toast.add({ title: "Nama, poli, dan deskripsi wajib diisi", type: "error" });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        poliCode: form.poliCode.trim(),
        poliName: form.poliName.trim(),
        specialistTag: form.specialistTag.trim(),
        schedule: form.schedule.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        focusAreas,
        sortOrder: Number(form.sortOrder) || 0,
        isActive: form.isActive,
      };

      if (editingId) {
        await updateDoctor(editingId, payload);
        toast.add({ title: "Data dokter/poli diperbarui", type: "success" });
      } else {
        await createDoctor(payload);
        toast.add({ title: "Data dokter/poli ditambahkan", type: "success" });
      }
      setDialogOpen(false);
      await loadDoctors();
    } catch (error) {
      toast.add({
        title: "Gagal menyimpan data",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (doc: Doctor, nextActive: boolean) => {
    try {
      await updateDoctor(doc.id, { isActive: nextActive });
      setDoctors((prev) => prev.map((item) => (item.id === doc.id ? { ...item, isActive: nextActive } : item)));
      toast.add({ title: nextActive ? "Poli/dokter diaktifkan" : "Poli/dokter dinonaktifkan", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal mengubah status",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const handleDelete = async (doc: Doctor) => {
    if (!window.confirm(`Hapus "${doc.name}"?`)) return;
    try {
      await deleteDoctor(doc.id);
      setDoctors((prev) => prev.filter((item) => item.id !== doc.id));
      toast.add({ title: "Data dihapus", type: "success" });
    } catch (error) {
      toast.add({
        title: "Gagal menghapus",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-normal tracking-tight">Dokter &amp; Poli</h1>
          <p className="text-muted-foreground text-sm">
            Kelola jadwal poliklinik spesialis dan informasi dokter untuk halaman Dokter Kami.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus />
          Tambah Dokter / Poli
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-56 w-full rounded-xl" />
          <Skeleton className="h-56 w-full rounded-xl" />
        </div>
      ) : doctors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            Belum ada data dokter atau poli.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {doctors.map((doc) => (
            <Card key={doc.id} className="flex flex-col justify-between">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-primary text-xs font-medium">{doc.poliName}</p>
                    <CardTitle className="text-lg">{doc.name}</CardTitle>
                  </div>
                  <Badge variant={doc.isActive ? "default" : "secondary"}>{doc.isActive ? "Aktif" : "Nonaktif"}</Badge>
                </div>
                <p className="text-muted-foreground text-xs">{doc.description}</p>
                <div className="text-muted-foreground space-y-1 pt-2 text-xs">
                  <div>Jadwal: {doc.schedule}</div>
                  <div>Lokasi: {doc.location}</div>
                </div>
              </CardHeader>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <Switch
                  checked={doc.isActive}
                  onCheckedChange={(checked) => handleToggleActive(doc, Boolean(checked))}
                  aria-label={`Aktifkan ${doc.name}`}
                />
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(doc)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="icon-sm" onClick={() => handleDelete(doc)} aria-label="Hapus">
                    <Trash2 />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Dokter / Poli" : "Tambah Dokter / Poli"}</DialogTitle>
            <DialogDescription>Atur nama dokter atau unit poli beserta jadwal praktiknya.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="doc-name">Nama Dokter / Unit Poli</Label>
                <Input
                  id="doc-name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="doc-poli-code">Kode Poli</Label>
                <Input
                  id="doc-poli-code"
                  value={form.poliCode}
                  onChange={(e) => setForm((p) => ({ ...p, poliCode: e.target.value }))}
                  placeholder="sp-pd / sp-gk"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="doc-poli-name">Nama Poli</Label>
                <Input
                  id="doc-poli-name"
                  value={form.poliName}
                  onChange={(e) => setForm((p) => ({ ...p, poliName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="doc-tag">Tag Spesialisasi</Label>
                <Input
                  id="doc-tag"
                  value={form.specialistTag}
                  onChange={(e) => setForm((p) => ({ ...p, specialistTag: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="doc-schedule">Jadwal Praktik</Label>
                <Input
                  id="doc-schedule"
                  value={form.schedule}
                  onChange={(e) => setForm((p) => ({ ...p, schedule: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="doc-location">Lokasi</Label>
                <Input
                  id="doc-location"
                  value={form.location}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="doc-desc">Deskripsi</Label>
              <Textarea
                id="doc-desc"
                rows={3}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="doc-focus">Cakupan Konsultasi (1 poin per baris)</Label>
              <Textarea
                id="doc-focus"
                rows={3}
                value={form.focusAreasText}
                onChange={(e) => setForm((p) => ({ ...p, focusAreasText: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="doc-active" className="cursor-pointer">
                Tampilkan di halaman Dokter Kami
              </Label>
              <Switch
                id="doc-active"
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
