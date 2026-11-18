import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Vida Medical CMS",
  version: packageJson.version,
  copyright: `© ${currentYear}, Vida Medical Centre.`,
  meta: {
    title: "Vida Medical CMS | Panel Admin Konten & Layanan",
    description:
      "Dashboard CMS Vida Medical Centre untuk mengelola Promo Highlight, Artikel Healthpedia, Dokter & Poli, serta Layanan Medis.",
  },
};
