import { FileText, Image, LayoutDashboard, type LucideIcon, Sparkles, Stethoscope } from "lucide-react";

export type NavBadge = "new" | "updated" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Vida Medical CMS",
    items: [
      {
        id: "default",
        title: "Overview",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        id: "promos",
        title: "Promo Highlight",
        url: "/dashboard/promos",
        icon: Image,
      },
      {
        id: "articles",
        title: "Artikel Healthpedia",
        url: "/dashboard/articles",
        icon: FileText,
      },
      {
        id: "doctors",
        title: "Dokter & Poli",
        url: "/dashboard/doctors",
        icon: Stethoscope,
      },
      {
        id: "services",
        title: "Layanan Kami",
        url: "/dashboard/services",
        icon: Sparkles,
      },
    ],
  },
];
