import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import Header from "@/components/global/Header";
import CustomCursor from "@/components/global/CustomCursor";
import DiscountTimer from "@/components/ui/DiscountTimer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Playfair_Display({
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
          <DiscountTimer />
        </SmoothScroll>
      </body>
    </html>
  );
}
