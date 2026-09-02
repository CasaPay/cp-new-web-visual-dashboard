import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

type Card = { title: string; body: string };
type Faq = { question: string; answer: string };

export type EditorialLandingProps = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  cta?: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro?: string;
  cards: Card[];
  storyTitle: string;
  storyBody: string;
  storyImage?: string;
  storyAlt?: string;
  boundaryTitle: string;
  boundaryBody: string;
  faqs: Faq[];
  formTitle?: string;
  formAudience?: string;
};

export function EditorialLanding(props: EditorialLandingProps) {
  return (
    <>
      <section className="page-hero">
        <Image src={props.heroImage} alt={props.heroAlt} fill priority sizes="100vw" />
        <div className="page-hero-content">
          <span className="eyebrow" style={{ color: "#91e4f0" }}>{props.eyebrow}</span>
          <h1>{props.title}</h1>
          <p>{props.intro}</p>
          <a href="#get-started" className="button primary">{props.cta ?? "Get started"}</a>
        </div>
      </section>
      <section className="shell section">
        <div className="section-heading">
          <span className="eyebrow">{props.sectionEyebrow}</span>
          <h2>{props.sectionTitle}</h2>
          {props.sectionIntro && <p className="lede">{props.sectionIntro}</p>}
        </div>
        <div className="card-grid">
          {props.cards.map((card, index) => <article className="info-card" key={card.title}><span className="number">0{index + 1}</span><h3>{card.title}</h3><p>{card.body}</p></article>)}
        </div>
      </section>
      <section className="shell editorial-split">
        <div className="editorial-image">
          <Image src={props.storyImage ?? props.heroImage} alt={props.storyAlt ?? props.heroAlt} fill sizes="(max-width:900px) 100vw,50vw" />
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">Connected rental context</span>
          <h2>{props.storyTitle}</h2>
          <p className="lede">{props.storyBody}</p>
          <Link href="/help" className="button secondary" style={{ alignSelf: "flex-start", marginTop: 16 }}>Talk to support</Link>
        </div>
      </section>
      <section className="shell section">
        <div className="dark-section">
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Clear boundaries</span>
            <h2>{props.boundaryTitle}</h2>
            <p className="lede">{props.boundaryBody}</p>
          </div>
        </div>
      </section>
      <section className="shell section">
        <div className="section-heading"><span className="eyebrow">Frequently asked questions</span><h2>The important details.</h2></div>
        <div className="faq">{props.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>
      <section id="get-started" className="section" style={{ background: "#e7f7fc" }}>
        <div className="shell"><LeadForm audience={props.formAudience} title={props.formTitle} /></div>
      </section>
    </>
  );
}
