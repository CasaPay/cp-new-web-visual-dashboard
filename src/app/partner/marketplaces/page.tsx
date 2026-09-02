import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = { title: "Marketplace Partners", description: "Explore how rental marketplaces can connect discovery to a clearer payment journey." };

export default function MarketplacesPage() {
  return <>
    <section className="page-hero"><Image src="/media/generated/platform-partner-photo/openai-gpt-image-2/platform-partner-human-life-landscape.png" alt="Rental partners collaborating in a residential community" fill priority sizes="100vw" /><div className="page-hero-content"><span className="eyebrow" style={{color:'#91e4f0'}}>For rental marketplaces</span><h1>Connect discovery to the rent journey.</h1><p>Explore a partnership path that helps operator-listed homes move from discovery toward contextual payments and support.</p><a className="button primary" href="#marketplace-interest">Register interest</a></div></section>
    <section className="shell section"><div className="section-heading"><span className="eyebrow">Early partner path</span><h2>A marketplace connection, carefully scoped.</h2></div><div className="card-grid"><article className="info-card"><span className="number">01</span><h3>Operator context</h3><p>Keep the rental operator and home attached to the tenant journey.</p></article><article className="info-card"><span className="number">02</span><h3>Tenant handoff</h3><p>Create a clearer path from a listing to an applicable RentLink flow.</p></article><article className="info-card"><span className="number">03</span><h3>Support continuity</h3><p>Preserve useful rental context when a tenant needs help.</p></article></div></section>
    <section className="shell section"><div className="dark-section"><div className="section-heading" style={{marginBottom:0}}><span className="eyebrow">Pre-launch scope</span><h2>No integration promise is implied.</h2><p className="lede">Marketplace availability, technical scope, commercial terms, attribution and supported markets require a separate agreement and product review.</p></div></div></section>
    <section id="marketplace-interest" className="section" style={{background:'#e7f7fc'}}><div className="shell"><LeadForm audience="marketplace" title="Tell us about your marketplace." /></div></section>
  </>;
}
