import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | ROYAL SUITES",
    description: "Get in touch with the ROYAL SUITES concierge. We are here to assist with your reservations and inquiries.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
