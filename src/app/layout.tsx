import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import Header from "@/components/global/Header";
import CustomCursor from "@/components/global/CustomCursor";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PS HOTEL | Luxury Redefined",
  description:
    "Experience unparalleled luxury at PRS Hotel. Premium destinations, world-class amenities, and bespoke hospitality that transcends expectations.",
  keywords: "luxury hotel, premium resort, five star hotel, PRS Hotel, boutique hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
