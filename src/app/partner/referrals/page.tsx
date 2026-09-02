import type { Metadata } from "next";
import { EditorialLanding } from "@/components/EditorialLanding";
import { referralsLanding } from "@/content/landings";

export const metadata: Metadata = { title: "CasaPay Referrals", description: "A referral programme for participating rental operators." };
export default function ReferralsPage() { return <EditorialLanding {...referralsLanding} />; }
