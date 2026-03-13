import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Luxury Accommodations | ROYAL SUITES",
    description: "Experience unparalleled luxury in our rooms, suites, and private villas. Designed for comfort, elegance, and exclusivity.",
};

export default function AccommodationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
