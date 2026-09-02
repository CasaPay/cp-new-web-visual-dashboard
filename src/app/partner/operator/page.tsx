import type { Metadata } from "next";
import { EditorialLanding } from "@/components/EditorialLanding";
import { operatorLanding } from "@/content/landings";

export const metadata: Metadata = { title: "For rental operators", description: "Connect rent payment, support and reconciliation with CasaPay." };
export default function OperatorPage() { return <EditorialLanding {...operatorLanding} />; }
