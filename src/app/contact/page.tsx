"use client";

import Contact from "@/components/sections/Contact";
import Booking from "@/components/sections/Booking";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <main className="bg-white">
            <Header />
            <div className="pt-32 pb-8 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Get In Touch</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Contact <span className="italic">Us</span></h1>
                    <p className="text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                        Whether you have a question about a reservation or want to learn more about our properties, our dedicated team is here to assist you.
                    </p>
                </motion.div>
            </div>
            <Contact />
            <Booking />
            <Footer />
        </main>
    );
}
