import type { Metadata } from "next";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export const metadata: Metadata = {
    title: "About Us | ROYAL SUITES",
    description: "Discover the heritage and philosophy of ROYAL SUITES. A legacy of luxury and personalized service since 1985.",
};

export default function AboutPage() {
    return (
        <main className="bg-white">
            <Header />
            <div className="pt-32 pb-4">
                <About />
                <Features />
            </div>
            <Footer />
        </main>
    );
}
