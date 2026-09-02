import type { Metadata } from "next";
import { EditorialLanding } from "@/components/EditorialLanding";
import { capitalLanding } from "@/content/landings";

export const metadata: Metadata = { title: "CasaPay Capital", description: "A review-led capital path for eligible rental operators." };
export default function CapitalPage() { return <EditorialLanding {...capitalLanding} />; }
