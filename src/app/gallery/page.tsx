"use client";

import Gallery from "@/components/sections/Gallery";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { motion } from "framer-motion";

export default function GalleryPage() {
    return (
        <main className="bg-background">
            <Header />
            <div className="pt-32 pb-8 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Visual Journey</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">The <span className="italic">Gallery</span></h1>
                </motion.div>
            </div>
            <Gallery />
            <Footer />
        </main>
    );
}
