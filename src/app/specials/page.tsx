"use client";

import Specials from "@/components/sections/Specials";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { motion } from "framer-motion";

export default function SpecialsPage() {
    return (
        <main className="bg-[#F9F7F5]">
            <Header />
            <div className="pt-32 pb-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Exclusive Access</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Specials & <span className="italic">Offers</span></h1>
                    <p className="text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                        Thoughtfully curated experiences and promotional packages designed to make your journey with Royal Suits truly unforgettable.
                    </p>
                </motion.div>
            </div>
            <Specials />
            <Footer />
        </main>
    );
}
