"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";

const experiences = [
    {
        title: "Private Yacht Charter",
        subtitle: "Sail the azure waters",
        description: "Cruise along pristine coastlines aboard our luxury fleet. Champagne sunsets and gourmet dining on deck.",
    },
    {
        title: "Helicopter Tours",
        subtitle: "See the world from above",
        description: "Soar over breathtaking landscapes with our bespoke aerial excursions. An unforgettable perspective.",
    },
    {
        title: "Underwater Dining",
        subtitle: "Dine beneath the waves",
        description: "An extraordinary culinary experience surrounded by marine life. A multi-course journey into the deep.",
    },
    {
        title: "Desert Safari",
        subtitle: "Embrace the golden dunes",
        description: "Luxury camping under starlit skies. Traditional feasts, falconry, and the silence of the desert.",
    },
];

export default function Experiences() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-foreground overflow-hidden" id="experiences">
            <div className="section-padding pb-0">
                <div className="max-w-7xl mx-auto mb-16">
                    <FadeIn>
                        <p className="subtitle mb-6">Signature Experiences</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="Moments Crafted To Last A Lifetime"
                        className="heading-lg text-white"
                    />
                </div>
            </div>

            {/* Horizontal scroll cards */}
            <motion.div
                style={{ x }}
                className="flex gap-6 md:gap-8 pl-6 md:pl-12 lg:pl-24"
            >
                {experiences.map((exp, i) => (
                    <motion.div
                        key={exp.title}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="min-w-[320px] md:min-w-[420px] lg:min-w-[500px] group"
                    >
                        <div className="relative aspect-[4/5] bg-white/[0.03] border border-white/10 overflow-hidden">
                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                <span className="text-turquoise text-[10px] tracking-ultra uppercase mb-3">
                                    {exp.subtitle}
                                </span>
                                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wider mb-4 group-hover:text-turquoise-light transition-colors duration-500">
                                    {exp.title}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {exp.description}
                                </p>

                                {/* Hover line */}
                                <motion.div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-8 h-[1px] bg-turquoise" />
                                    <span className="text-turquoise text-xs tracking-widest uppercase">
                                        Explore
                                    </span>
                                </motion.div>
                            </div>

                            {/* Number */}
                            <div className="absolute top-8 right-8">
                                <span className="font-serif text-6xl text-white/[0.05]">
                                    0{i + 1}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Marquee */}
            <div className="mt-20 overflow-hidden border-t border-b border-white/5 py-6">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    {[...Array(4)].map((_, i) => (
                        <span
                            key={i}
                            className="font-serif text-5xl md:text-7xl text-white/[0.03] tracking-cinematic mx-8"
                        >
                            PRS HOTEL • LUXURY REDEFINED • EXPERIENCE THE EXTRAORDINARY •{" "}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
