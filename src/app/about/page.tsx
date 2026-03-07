"use client";

import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

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
