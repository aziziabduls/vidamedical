"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowRight, FileText, Image as ImageIcon, Sparkles, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { listArticles, listDoctors, listPromos, listServices } from "@/lib/api";

interface OverviewStats {
  promosTotal: number;
  promosActive: number;
  articlesTotal: number;
  articlesPublished: number;
  doctorsTotal: number;
  doctorsActive: number;
  servicesTotal: number;
  servicesActive: number;
}

export function CmsOverview() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([listPromos(), listArticles(), listDoctors(), listServices()])
      .then(([promos, articles, doctors, services]) => {
        if (!active) return;
        setStats({
          promosTotal: promos.length,
          promosActive: promos.filter((p) => p.isActive).length,
          articlesTotal: articles.length,
          articlesPublished: articles.filter((a) => a.isPublished).length,
          doctorsTotal: doctors.length,
          doctorsActive: doctors.filter((d) => d.isActive).length,
          servicesTotal: services.length,
          servicesActive: services.filter((s) => s.isActive).length,
        });
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Gagal memuat ringkasan data API.");
      });

    return () => {
      active = false;
    };
  }, []);

  const cards = [
    {
      title: "Promo Highlight",
      href: "/dashboard/promos",
      icon: ImageIcon,
      total: stats?.promosTotal ?? 0,
      sub: `${stats?.promosActive ?? 0} banner aktif di carousel`,
    },
    {
      title: "Artikel Healthpedia",
      href: "/dashboard/articles",
      icon: FileText,
      total: stats?.articlesTotal ?? 0,
      sub: `${stats?.articlesPublished ?? 0} artikel terpublikasi`,
    },
    {
      title: "Dokter & Poli",
      href: "/dashboard/doctors",
      icon: Stethoscope,
      total: stats?.doctorsTotal ?? 0,
      sub: `${stats?.doctorsActive ?? 0} poli/dokter aktif`,
    },
    {
      title: "Layanan Kami",
      href: "/dashboard/services",
      icon: Sparkles,
      total: stats?.servicesTotal ?? 0,
      sub: `${stats?.servicesActive ?? 0} paket layanan aktif`,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-normal tracking-tight">Ringkasan Konten</h1>
        <p className="text-muted-foreground text-sm">
          Kelola konten website Vida Medical Centre yang terhubung dengan Express.js API dan PostgreSQL.
        </p>
      </div>

      {error && (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive text-base">Koneksi API Bermasalah</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.href}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <Icon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent className="space-y-3">
                {stats ? (
                  <>
                    <div className="text-3xl font-semibold tabular-nums">{item.total}</div>
                    <p className="text-muted-foreground text-xs">{item.sub}</p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                  nativeButton={false}
                  render={<Link href={item.href} />}
                >
                  <span>Kelola</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
