"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";

const stats = [
    { value: "50+", label: "Luxury Suites" },
    { value: "12", label: "Global Destinations" },
    { value: "24/7", label: "Concierge Service" },
    { value: "15", label: "Years of Excellence" },
];

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="section-padding bg-white relative" id="about">
            {/* Decorative elements */}
            <motion.div
                style={{ width: lineWidth }}
                className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-turquoise via-turquoise/50 to-transparent"
            />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left - Text */}
                    <div className="space-y-10">
                        <FadeIn>
                            <span className="subtitle font-medium">Philosophy</span>
                        </FadeIn>

                        <TextScrollReveal
                            text="Where Heritage Meets Modern Luxury"
                            className="heading-lg text-foreground leading-[1.1] tracking-tight"
                        />

                        <FadeIn delay={0.2}>
                            <p className="body-text text-xl">
                                ROYAL SUITES is more than a destination — it is an experience meticulously
                                curated for the discerning traveller. Born from a vision to redefine
                                hospitality, we blend the grandeur of heritage architecture with the
                                warmth of personalized service.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="body-text">
                                Each property in our portfolio is a masterpiece, chosen for its unique
                                character and breathtaking surroundings. From sun-kissed coastlines to
                                misty mountain retreats, every ROYAL SUITES promises an unforgettable stay
                                that transcends the ordinary.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="flex items-center gap-6 pt-6">
                                <div className="w-16 h-[1px] bg-turquoise" />
                                <p className="text-turquoise text-[10px] tracking-[0.5em] uppercase font-bold">
                                    Established 1985
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right - Stats */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {stats.map((stat, i) => (
                            <FadeIn key={stat.label} delay={i * 0.1} direction="up">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="p-10 border border-foreground/5 bg-[#fbfaf8] relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-turquoise/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
                                    <span className="font-serif text-5xl md:text-6xl text-turquoise relative z-10 block mb-4 font-light">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 relative z-10 font-bold">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
