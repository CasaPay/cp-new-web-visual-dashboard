import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://casapay.app"),
  title: { default: "CasaPay — Renting, made clearer", template: "%s — CasaPay" },
  description: "Connected rent payments and rental experiences for tenants, operators and platforms.",
  icons: { icon: "/media/brand/casapay-favicon-64.png", apple: "/media/brand/casapay-touch-icon-180.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
