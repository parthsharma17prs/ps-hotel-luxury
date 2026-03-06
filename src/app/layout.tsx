import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import Header from "@/components/global/Header";
import CustomCursor from "@/components/global/CustomCursor";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter", // Keep variable name same so global CSS doesn't break
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-cormorant", // Keep variable name same so global CSS doesn't break
  display: "swap",
});

export const metadata: Metadata = {
  title: "PS HOTEL | Luxury Redefined",
  description:
    "Experience unparalleled luxury at PS Hotel. Premium destinations, world-class amenities, and bespoke hospitality that transcends expectations.",
  keywords: "luxury hotel, premium resort, five star hotel, PS Hotel, boutique hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
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
