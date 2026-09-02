import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityExplorer } from "@/components/CityExplorer";
import { cityData } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ country: "est", city: "tallinn" }, { country: "gbr", city: "london" }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; city: string }> }): Promise<Metadata> {
  const { country, city } = await params;
  const data = cityData[`${country}/${city}`];
  if (!data) return {};
  return { title: `Rent in ${data.city}`, description: `Explore professionally operated rental homes in ${data.city}.` };
}

export default async function CityPage({ params }: { params: Promise<{ country: string; city: string }> }) {
  const { country, city } = await params;
  const data = cityData[`${country}/${city}`];
  if (!data) notFound();
  return <CityExplorer data={data} />;
}
