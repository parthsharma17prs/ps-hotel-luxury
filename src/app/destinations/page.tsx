"use client";

import Destinations from "@/components/sections/Destinations";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { motion } from "framer-motion";

export default function DestinationsPage() {
    return (
        <main className="bg-background">
            <Header />
            <div className="pt-32 pb-16 px-6 text-center bg-cream">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Royal Suits</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Our <span className="italic">Destinations</span></h1>
                    <p className="text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                        Explore our world-class properties situated in the most breathtaking locations across the globe, each offering a unique blend of heritage and modern luxury.
                    </p>
                </motion.div>
            </div>
            <Destinations />
            <Footer />
        </main>
    );
}
