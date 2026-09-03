"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isPartnerPath, operatorLinks, partnerLinks, tenantLinks } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const partner = isPartnerPath(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setPartnerOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setPartnerOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  const groups = partner
    ? [
        { label: "For operators", href: "/partner/operator", links: operatorLinks },
        { label: "Partner with CasaPay", links: partnerLinks },
      ]
    : [{ label: "For tenants", links: tenantLinks }];
  const account = partner ? "https://op.test.casapay.com/" : "https://tnt.test.casapay.com/";

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link href="/tenant" className="brand" aria-label="CasaPay tenant home">
          <Image src="/media/brand/casapay-logo.png" alt="CasaPay" width={132} height={38} priority />
        </Link>

        <div className="audience-switch" aria-label="Choose audience">
          <Link href="/tenant" className={!partner ? "active" : undefined}>Tenant</Link>
          <div className="audience-partner">
            <button
              type="button"
              aria-expanded={partnerOpen}
              aria-controls="partner-picker"
              className={partner ? "active" : undefined}
              onClick={() => setPartnerOpen((value) => !value)}
            >
              Partner <span className="chevron" aria-hidden="true" />
            </button>
            {partnerOpen && (
              <nav id="partner-picker" className="floating-menu audience-menu" aria-label="Partner experiences" onClick={() => setPartnerOpen(false)}>
                <Link href="/partner/operator">For operators</Link>
                <Link href="/partner/platforms">For platforms</Link>
              </nav>
            )}
          </div>
        </div>

        <div className="header-actions" aria-label={partner ? "Operator account actions" : "Tenant account actions"}>
          <a href={account} className="button secondary">Log in</a>
          <a href={account} className="button primary">Sign up</a>
        </div>

        <button
          type="button"
          className={`burger${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>

        {menuOpen && (
          <nav id="site-menu" className="floating-menu site-menu" aria-label={partner ? "Partner" : "For tenants"} onClick={() => setMenuOpen(false)}>
            {groups.map((group) => (
              <section key={group.label}>
                {"href" in group ? <Link className="menu-label menu-label-link" href={group.href!}>{group.label}</Link> : <h2 className="menu-label">{group.label}</h2>}
                {group.links.map(([label, href]) => (
                  <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
                ))}
              </section>
            ))}
            <div className="mobile-auth">
              <strong>{partner ? "Operator" : "Tenant"}</strong>
              <a href={account} className="button secondary">Log in</a>
              <a href={account} className="button primary">Sign up</a>
              <Link className="role-switch" href={partner ? "/" : "/partner/operator"}>
                Switch to {partner ? "Tenant" : "Operator"}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
