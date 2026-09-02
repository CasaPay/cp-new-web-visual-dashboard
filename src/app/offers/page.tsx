import type { Metadata } from "next";
import { OffersGrid, type Offer } from "@/components/OffersGrid";
import { cityData, mediaPath } from "@/lib/site";

export const metadata: Metadata = { title: "CasaPay Offers", description: "Find operator-listed rental homes in Tallinn and London." };

export default function OffersPage() {
  const offers: Offer[] = Object.values(cityData).flatMap((data) => data.buildings.slice(0, 6).map((building) => ({
    id: `${data.city}-${building.id}`, name: building.name, city: data.city,
    type: building.segment ?? building.propertyTypes[0] ?? "apartment", description: building.description,
    image: mediaPath(building.images?.[0] ?? building.image ?? ""), href: building.applicationUrl,
    operator: data.operators[building.operatorId]?.name ?? "Rental operator",
  })));
  return <>
    <section className="shell section" style={{paddingTop:72}}><div className="section-heading"><span className="eyebrow">CasaPay Offers</span><h1 style={{font:'760 clamp(58px,9vw,98px)/.9 var(--display)',margin:'14px 0'}}>Find an operator-listed home.</h1><p className="lede">Source-backed rental inventory from professional operators in Tallinn and London.</p></div><OffersGrid offers={offers}/></section>
    <section className="section" style={{background:'var(--teal)',color:'#fff'}}><div className="shell section-heading" style={{marginBottom:0}}><span className="eyebrow" style={{color:'#91e4f0'}}>For operators</span><h2>List homes with the rent context attached.</h2><p className="lede" style={{color:'#c9d9dc'}}>Connect discovery, the rental obligation and a direct operator journey.</p><a className="button primary" href="/partner/operator" style={{marginTop:22}}>Partner with CasaPay</a></div></section>
  </>;
}
