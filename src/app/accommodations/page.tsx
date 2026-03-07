"use client";

import Accommodations from "@/components/sections/Accommodations";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { motion } from "framer-motion";

export default function AccommodationsPage() {
    return (
        <main className="bg-white">
            <Header />
            <div className="pt-32 pb-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Refined Living</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Suites & <span className="italic">Villas</span></h1>
                    <p className="text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                        Experience unparalleled comfort in our meticulously designed rooms and sprawling private villas, where every detail is tailored to your desires.
                    </p>
                </motion.div>
            </div>
            <Accommodations />
            <Footer />
        </main>
    );
}
