"use client";

import { motion } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn, StaggerContainer, StaggerChild } from "../ui/AnimationWrappers";
import Image from "next/image";

const destinations = [
    {
        name: "The Azure Retreat",
        location: "Maldives",
        price: "₹1,25,000",
        perNight: "per night",
        description: "Overwater villas suspended above crystal-clear lagoons. Private infinity pools and direct ocean access.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2070&auto=format&fit=crop",
        accent: "var(--gold)",
    },
    {
        name: "Alpine Serenity",
        location: "Swiss Alps",
        price: "₹95,000",
        perNight: "per night",
        description: "Secluded chalets nestled among snow-capped peaks. Fireside luxury with panoramic mountain views.",
        image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=2071&auto=format&fit=crop",
        accent: "var(--turquoise)",
    },
    {
        name: "Desert Oasis",
        location: "Dubai, UAE",
        price: "₹1,10,000",
        perNight: "per night",
        description: "Luxury tented camps amid golden dunes. Starlit desert experiences with Arabian hospitality.",
        image: "https://images.unsplash.com/photo-1489493173507-6feea31f12ff?q=80&w=2070&auto=format&fit=crop",
        accent: "var(--gold)",
    },
    {
        name: "Jungle Canopy",
        location: "Costa Rica",
        price: "₹85,000",
        perNight: "per night",
        description: "Treehouse suites woven into the rainforest canopy. Wake to the symphony of exotic birds.",
        image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop",
        accent: "var(--turquoise)",
    },
    {
        name: "Urban Sanctuary",
        location: "Tokyo, Japan",
        price: "₹1,50,000",
        perNight: "per night",
        description: "Penthouse suites in the heart of Tokyo. Where ancient tradition meets futuristic luxury.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1967&auto=format&fit=crop",
        accent: "var(--gold)",
    },
];

export default function Destinations() {
    return (
        <section className="section-padding bg-background text-foreground relative overflow-hidden" id="destinations">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <FadeIn>
                        <p className="subtitle mb-6 text-gold">Curated Escapes</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="World-Class Destinations"
                        className="heading-lg text-foreground"
                    />
                    <FadeIn delay={0.2}>
                        <p className="body-text text-foreground/60 max-w-2xl mx-auto mt-6">
                            From tropical paradises to alpine wonderlands, each PRS Hotel property
                            is handpicked for its extraordinary beauty and exclusivity.
                        </p>
                    </FadeIn>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {destinations.map((dest, i) => (
                        <StaggerChild key={dest.name}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                                className={`group relative bg-cream overflow-hidden flex flex-col h-full rounded-none transition-shadow hover:shadow-2xl shadow-sm ${i === 3 || i === 4 ? "md:col-span-1 lg:max-w-md mx-auto" : ""}`}
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.8 }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            className="object-cover transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs tracking-widest uppercase text-white/80">
                                                    {dest.location}
                                                </span>
                                            </div>
                                            <h3 className="font-serif text-2xl text-white tracking-wider mt-2">
                                                {dest.name}
                                            </h3>
                                            <div className="flex gap-1 mt-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <svg key={index} className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-1">
                                        {dest.description}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-end justify-between pt-6 border-t border-foreground/10">
                                        <div>
                                            <span className="font-serif text-2xl text-foreground">{dest.price}</span>
                                            <span className="text-foreground/40 text-xs ml-2">{dest.perNight}</span>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-xs font-bold tracking-widest uppercase text-turquoise hover:text-gold transition-colors"
                                        >
                                            View →
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </StaggerChild>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
