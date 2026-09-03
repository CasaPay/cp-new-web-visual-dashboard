"use client";

import Image from "next/image";
import Link from "next/link";
import { operatorLinks, partnerLinks, tenantLinks } from "@/lib/site";

export function SiteFooter() {
  const groups = [
    ["For tenants", tenantLinks],
    ["For operators", operatorLinks],
    ["Partner with CasaPay", partnerLinks],
  ] as const;

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/media/brand/casapay-logo.png" alt="CasaPay" width={120} height={35} />
          <p>Renting, connected through payments.</p>
          <div className="footer-badges">
            <a href="https://apps.apple.com/app/casapay/id6756551004">App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.casapay.tnt">Google Play</a>
          </div>
        </div>
        {groups.map(([label, links]) => (
          <details className="footer-column" key={label} open>
            <summary>{label}</summary>
            <ul>
              {links.map(([text, href]) => <li key={href}><Link href={href}>{text}</Link></li>)}
            </ul>
          </details>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} CasaPay</span>
        <span>Renting, made clearer.</span>
      </div>
    </footer>
  );
}
