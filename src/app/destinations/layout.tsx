import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Global Destinations | ROYAL SUITES",
    description: "Explore our collection of luxury residences and resorts in the world's most breathtaking locations.",
};

export default function DestinationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
