import type { Metadata } from "next";
import { EditorialLanding } from "@/components/EditorialLanding";
import { rentlinkLanding } from "@/content/landings";

export const metadata: Metadata = { title: "RentLink", description: "The payment link built for rent." };
export default function RentLinkPage() { return <EditorialLanding {...rentlinkLanding} />; }
