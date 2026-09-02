"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const values = ["TRUSTED", "FLEXIBLE", "AFFORDABLE", "NO-DEPOSIT"];
const locations = [
  { name: "Tallinn", detail: "Estonia", href: "/en/est/tallinn", terms: "tallinn estonia taltech tallinn university" },
  { name: "London", detail: "United Kingdom", href: "/en/gbr/london", terms: "london united kingdom kcl ucl imperial" },
];

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % values.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized ? locations.filter((location) => location.terms.includes(normalized)) : locations;
  }, [query]);

  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">CasaPay for tenants</span>
          <h1 aria-label="Trusted, flexible, affordable and no-deposit renting.">
            <span aria-hidden="true">{values[index]}</span><br />RENTING.
          </h1>
          <p className="lede">Find operator-listed homes, understand the rent before move-in, and keep payments and support in one clearer journey.</p>
          <div className="location-box">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => window.setTimeout(() => setFocused(false), 150)}
              placeholder="Start typing a city or university…"
              aria-label="Find homes by city or university"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={focused}
              aria-controls="location-results"
            />
            <span aria-hidden="true">⌕</span>
            {focused && (
              <div className="location-results" id="location-results" role="listbox">
                {results.map((location) => (
                  <Link role="option" key={location.href} href={location.href}>
                    <strong>{location.name}</strong><small>{location.detail} · Browse verified inventory</small>
                  </Link>
                ))}
                {!results.length && <div className="location-empty">This location is not available yet. Try Tallinn or London.</div>}
              </div>
            )}
          </div>
          <div className="hero-actions">
            <Link href="/offers" className="button primary">Explore offers</Link>
            <Link href="/tenant-protection" className="button secondary">How tenants are supported</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="map-orbit" />
          <span className="home-pin one">Tallinn</span>
          <span className="home-pin two">London</span>
          <span className="home-pin three">Your next home</span>
        </div>
      </div>
    </section>
  );
}
