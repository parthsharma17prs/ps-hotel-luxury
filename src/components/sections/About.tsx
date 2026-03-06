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
                    <div className="space-y-8">
                        <FadeIn>
                            <p className="subtitle">About PS Hotel</p>
                        </FadeIn>

                        <TextScrollReveal
                            text="Where Timeless Elegance Meets Modern Luxury"
                            className="heading-lg text-foreground"
                        />

                        <FadeIn delay={0.2}>
                            <p className="body-text">
                                PS Hotel is more than a destination — it is an experience meticulously
                                curated for the discerning traveller. Born from a vision to redefine
                                hospitality, we blend the grandeur of timeless architecture with the
                                warmth of personalized service.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="body-text">
                                Each property in our portfolio is a masterpiece, chosen for its unique
                                character and breathtaking surroundings. From sun-kissed coastlines to
                                misty mountain retreats, every PS Hotel promises an unforgettable stay
                                that transcends the ordinary.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="flex items-center gap-4 pt-4">
                                <div className="w-12 h-[1px] bg-turquoise" />
                                <p className="text-turquoise text-sm tracking-widest uppercase">
                                    Est. 2010
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right - Stats */}
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                        {stats.map((stat, i) => (
                            <FadeIn key={stat.label} delay={i * 0.1} direction="up">
                                <motion.div
                                    whileHover={{ y: -5, borderColor: "#1FB4B4" }}
                                    transition={{ duration: 0.3 }}
                                    className="p-8 md:p-10 border border-foreground/10 bg-cream/30 relative group"
                                >
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full h-0 bg-turquoise/5 group-hover:h-full transition-all duration-700"
                                    />
                                    <span className="font-serif text-4xl md:text-5xl text-turquoise relative z-10 block mb-3">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs tracking-cinematic uppercase text-foreground/50 relative z-10">
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
