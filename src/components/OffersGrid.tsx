"use client";

import Image from "next/image";
import { useState } from "react";

export type Offer = { id: string; name: string; city: string; type: string; description: string; image: string; href: string; operator: string };

export function OffersGrid({ offers }: { offers: Offer[] }) {
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const visible = offers.filter((offer) => (city === "all" || offer.city === city) && (type === "all" || offer.type === type));
  return <>
    <div className="offers-filters" aria-label="Filter offers">
      {[['all','Every city'],['Tallinn','Tallinn'],['London','London']].map(([value,label])=><button key={value} className={`category-pill${city===value?' active':''}`} aria-pressed={city===value} onClick={()=>setCity(value)}>{label}</button>)}
      <span aria-hidden="true" style={{width:1,background:'#cfdae0'}} />
      {[['all','Every type'],['apartment','Apartments'],['studio','Studios'],['pbsa','Student']].map(([value,label])=><button key={value} className={`category-pill${type===value?' active':''}`} aria-pressed={type===value} onClick={()=>setType(value)}>{label}</button>)}
    </div>
    <p style={{textAlign:'center',color:'var(--muted)',marginBottom:24}}><strong>{visible.length}</strong> operator-listed homes</p>
    <div className="card-grid">
      {visible.map((offer)=><article className="offer-card" key={offer.id}>
        <div style={{position:'relative',height:150,margin:'-28px -28px 0'}}><Image src={offer.image} alt="" fill sizes="33vw" style={{objectFit:'cover'}} /></div>
        <span className="tag" style={{display:'block',marginTop:20}}>{offer.city} · {offer.operator}</span><h3>{offer.name}</h3><p>{offer.description}</p><a className="listing-link" href={offer.href} target="_blank" rel="noopener noreferrer">View with operator →</a>
      </article>)}
    </div>
    {!visible.length&&<p className="lede" style={{textAlign:'center'}}>No homes match those filters yet.</p>}
  </>;
}
