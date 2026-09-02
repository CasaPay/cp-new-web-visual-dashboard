import type { Metadata } from "next";
import Image from "next/image";
import { EarningsCalculator } from "@/components/EarningsCalculator";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = { title: "Platform Partners", description: "Integrate operators with RentLink through your PMS, CRM or accounting platform." };

export default function PlatformsPage() {
  return (
    <>
      <section className="page-hero">
        <Image src="/media/generated/platform-partner-photo/openai-gpt-image-2/platform-partner-human-life-landscape.png" alt="A platform product professional and rental operator collaborating" fill priority sizes="100vw" />
        <div className="page-hero-content"><span className="eyebrow" style={{ color: "#91e4f0" }}>CasaPay Platform Partner Programme</span><h1>Earn with every operator you integrate with RentLink.</h1><p>PMS, CRM and accounting platforms can connect operators to KYC, rent payments, support handoffs and eligible protection workflows through one API.</p><a href="#earnings" className="button primary">See earning potential</a></div>
      </section>
      <section className="shell section">
        <div className="section-heading"><span className="eyebrow">Get started</span><h2>Three steps to the next earning event.</h2><p className="lede">Integrate once, then grow as operators activate through your platform.</p></div>
        <div className="card-grid">
          {[['Integrate','Connect RentLink to your PMS, CRM or accounting platform.'],['Activate','Bring a new rental operator into the connected CasaPay flow.'],['Earn','Each newly integrated operator creates an earning event.']].map(([title,body],index)=><article className="info-card" key={title}><span className="number">0{index+1}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>
      <section className="shell section" id="earnings"><div className="earnings"><div><span className="eyebrow" style={{ color: "#91e4f0" }}>Earning potential</span><h2 style={{ font: "760 clamp(46px,6vw,72px)/.96 var(--display)", margin: "14px 0" }}>Your platform grows with every activation.</h2><p className="lede" style={{ color: "#c9d9dc" }}>Each new operator integrated with RentLink is one earning event worth €250. Each activation also earns the platform team a CasaPay Platform Partner certificate.</p></div><EarningsCalculator /></div></section>
      <section className="shell editorial-split">
        <div className="editorial-image"><Image src="/media/generated/platform-partner-photo/openai-gpt-image-2/audiences/pms-platform.png" alt="Platform and operator professionals collaborating" fill sizes="50vw" /></div>
        <div className="editorial-copy"><span className="eyebrow">Built for rental platforms</span><h2>Add more operator value to what you already do.</h2><p className="lede">Bring payment clarity to property workflows, connect support context in CRM, or carry reconciliation information into accounting.</p></div>
      </section>
      <section className="shell section"><div className="faq"><details><summary>Who is the programme for?</summary><p>PMS, CRM and accounting platforms that serve rental operators.</p></details><details><summary>How does a platform earn?</summary><p>The platform earns €250 for every new operator it integrates with RentLink, subject to the applicable agreement.</p></details><details><summary>What does the API cover?</summary><p>Operator KYC, rent-payment flows, customer-support context and eligible protection workflows, depending on the approved implementation.</p></details></div></section>
      <section className="section" style={{ background: "#e7f7fc" }}><div className="shell"><LeadForm audience="platform" title="Become a Platform Partner." /></div></section>
    </>
  );
}
