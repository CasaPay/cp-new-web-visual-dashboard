"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CityData } from "@/lib/site";
import { mediaPath } from "@/lib/site";

const categoryOptions = [
  ["all", "All homes"],
  ["apartment", "Apartments"],
  ["studio", "Studios"],
  ["co_living", "Co-living"],
  ["pbsa", "Student housing"],
  ["pets", "Pet friendly"],
  ["fully_furnished", "Furnished"],
] as const;

export function CityExplorer({ data }: { data: CityData }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [selected, setSelected] = useState<string | null>(null);
  const mapNode = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markerLayer = useRef<import("leaflet").LayerGroup | null>(null);

  const listings = useMemo(() => {
    const filtered = data.buildings.filter((building) => category === "all"
      || building.propertyTypes.includes(category)
      || building.segment === category
      || building.amenities.includes(category));
    return filtered.sort((a, b) => {
      if (sort === "price-low") return (a.monthlyPriceFrom ?? Number.MAX_VALUE) - (b.monthlyPriceFrom ?? Number.MAX_VALUE);
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [category, data.buildings, sort]);

  useEffect(() => {
    let cancelled = false;
    void import("leaflet").then((L) => {
      if (cancelled || !mapNode.current) return;
      if (!mapRef.current) {
        const center: [number, number] = data.city === "London" ? [51.515, -0.12] : [59.43, 24.72];
        mapRef.current = L.map(mapNode.current, { zoomControl: true, scrollWheelZoom: false }).setView(center, data.city === "London" ? 11 : 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18,
        }).addTo(mapRef.current);
        markerLayer.current = L.layerGroup().addTo(mapRef.current);
      }
      markerLayer.current?.clearLayers();
      listings.forEach((building, index) => {
        const icon = L.divIcon({ className: "", html: `<div class="map-marker"><span>${index + 1}</span></div>`, iconSize: [34, 34], iconAnchor: [17, 34] });
        const marker = L.marker([building.latitude, building.longitude], { icon, title: building.name });
        marker.bindPopup(`<div class="map-popup"><strong>${building.name}</strong><span>${building.meta}</span></div>`);
        marker.on("click", () => {
          setSelected(building.id);
          document.getElementById(`listing-${building.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        marker.addTo(markerLayer.current!);
      });
      if (listings.length) {
        const bounds = L.latLngBounds(listings.map((item) => [item.latitude, item.longitude] as [number, number]));
        mapRef.current.fitBounds(bounds, { padding: [38, 38], maxZoom: 13 });
      }
    });
    return () => { cancelled = true; };
  }, [data.city, listings]);

  useEffect(() => () => {
    mapRef.current?.remove();
    mapRef.current = null;
  }, []);

  const formatPrice = (value: number) => new Intl.NumberFormat("en", {
    style: "currency", currency: data.currencyCode, maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className="city-page">
      <section className="shell city-intro">
        <span className="eyebrow">CasaPay Homes · {data.country}</span>
        <h1>Rent in {data.city}.</h1>
        <p className="lede">Explore professionally operated homes, compare the rental context, and continue directly with the operator.</p>
        <div className="category-row" aria-label="Filter homes">
          {categoryOptions.map(([id, label]) => (
            <button key={id} type="button" className={`category-pill${category === id ? " active" : ""}`} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>
          ))}
        </div>
      </section>
      <div className="city-workspace">
        <section className="rental-feed" aria-label={`${data.city} rental homes`}>
          <div className="rental-toolbar">
            <strong>{listings.length} homes</strong>
            <label>
              <span className="sr-only">Sort homes</span>
              <select className="control" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low first</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
          <div className="listing-grid">
            {listings.map((building) => {
              const operator = data.operators[building.operatorId];
              const image = building.images?.[0] ?? building.image;
              return (
                <article className={`listing-card${selected === building.id ? " selected" : ""}`} id={`listing-${building.id}`} key={building.id} onMouseEnter={() => setSelected(building.id)}>
                  <div className="listing-photo">
                    {image && <Image src={mediaPath(image)} alt={`${building.name} in ${data.city}`} fill sizes="(max-width: 900px) 100vw, 30vw" />}
                    {building.badge && <span className="listing-badge">{building.badge}</span>}
                  </div>
                  <div className="listing-body">
                    <div className="operator-line">
                      {operator?.logo && <Image src={mediaPath(operator.logo)} alt="" width={30} height={30} />}
                      <span>{operator?.name ?? "Rental operator"}</span>
                    </div>
                    <h2>{building.name}</h2>
                    <p>{building.meta}</p>
                    <p>{building.description}</p>
                    <strong className="listing-price">{building.monthlyPriceFrom ? `From ${formatPrice(building.monthlyPriceFrom)} / month` : building.unitCount ? `${building.unitCount} ${building.countType ?? "homes"}` : "Price from operator"}</strong>
                    <a className="listing-link" href={building.applicationUrl} target="_blank" rel="noopener noreferrer">View with operator →</a>
                  </div>
                </article>
              );
            })}
          </div>
          {!listings.length && <p className="lede">No homes match this filter yet.</p>}
          <p className="form-note" style={{ marginTop: 24 }}>{data.priceDisclaimer}</p>
        </section>
        <div ref={mapNode} className="city-map" aria-label={`Map of rental homes in ${data.city}`} />
      </div>
    </div>
  );
}
