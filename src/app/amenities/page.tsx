"use client";

import Amenities from "@/components/sections/Amenities";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { motion } from "framer-motion";

export default function AmenitiesPage() {
    return (
        <main className="bg-cream">
            <Header />
            <div className="pt-32 pb-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4 block">Unrivaled Service</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Exquisite <span className="italic">Amenities</span></h1>
                    <p className="text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                        From Michelin-starred dining to our signature serene spas, explore the world-class facilities available at every Royal Suits property.
                    </p>
                </motion.div>
            </div>
            <Amenities />
            <Footer />
        </main>
    );
}
