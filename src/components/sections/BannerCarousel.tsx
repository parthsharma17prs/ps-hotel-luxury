"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const banners = [
    {
        image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Summer Getaways",
        subtitle: "Book your perfect summer vacay with up to 25% off.",
        cta: "Explore Now"
    },
    {
        image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Culinary Experiences",
        subtitle: "Taste the exquisite flavors crafted by our award-winning chefs.",
        cta: "View Menus"
    },
    {
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Relax & Rejuvenate",
        subtitle: "Escape to our tranquil spas for a holistic wellness retreat.",
        cta: "Book a Spa"
    },
    {
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Coastal Paradises",
        subtitle: "Unwind at our beachfront properties with infinite ocean views.",
        cta: "Discover More"
    },
    {
        image: "https://images.unsplash.com/photo-1590490359854-dfbfaea7f978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "City Center Suites",
        subtitle: "Experience vibrant city life right outside your premium suite door.",
        cta: "View Locations"
    }
];

export default function BannerCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 4000); // Swaps every 4 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-background">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={banners[currentIndex].image}
                        alt={banners[currentIndex].title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-24 max-w-7xl mx-auto z-10 w-full">
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-gold tracking-widest uppercase text-sm font-semibold mb-3 drop-shadow-md"
                        >
                            Exclusives
                        </motion.p>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-4xl md:text-6xl font-serif text-white mb-4 drop-shadow-lg"
                        >
                            {banners[currentIndex].title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-white/90 text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md"
                        >
                            {banners[currentIndex].subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <button className="bg-gold text-foreground hover:bg-turquoise hover:text-white px-8 py-4 uppercase tracking-widest text-sm font-bold transition-colors duration-300">
                                {banners[currentIndex].cta}
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-12 h-1 rounded-full transition-colors duration-300 ${i === currentIndex ? "bg-gold" : "bg-white/30"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
