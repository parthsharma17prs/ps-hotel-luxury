"use client";

import { motion } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";

const locations = [
    { city: "Maldives", timezone: "GMT+5", temp: "28°C", status: "Open" },
    { city: "Swiss Alps", timezone: "GMT+1", temp: "2°C", status: "Open" },
    { city: "Dubai", timezone: "GMT+4", temp: "32°C", status: "Open" },
    { city: "Costa Rica", timezone: "GMT-6", temp: "26°C", status: "Coming Soon" },
    { city: "Tokyo", timezone: "GMT+9", temp: "14°C", status: "Open" },
];

export default function Location() {
    return (
        <section className="section-padding bg-foreground text-white relative overflow-hidden" id="locations">
            {/* Decorative grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 bottom-0 w-[1px] bg-white"
                        style={{ left: `${(i + 1) * 16.66}%` }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <div>
                        <FadeIn>
                            <p className="subtitle mb-6">Our Locations</p>
                        </FadeIn>
                        <TextScrollReveal
                            text="Find Us Around The World"
                            className="heading-lg text-white mb-8"
                        />
                        <FadeIn delay={0.2}>
                            <p className="text-white/40 font-light leading-relaxed max-w-lg">
                                Each PRS Hotel property is strategically positioned in the most
                                desirable destinations on earth. Whether you seek beachside
                                tranquility or mountain adventure, we are there.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="mt-10 flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-turquoise animate-pulse-soft" />
                                <span className="text-xs tracking-cinematic uppercase text-white/50">
                                    Currently accepting reservations
                                </span>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right - Location list */}
                    <div className="space-y-0">
                        {locations.map((loc, i) => (
                            <FadeIn key={loc.city} delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                                    transition={{ duration: 0.3 }}
                                    className="border-b border-white/10 py-6 flex items-center justify-between cursor-pointer group"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="font-serif text-xl md:text-2xl text-white/80 group-hover:text-turquoise-light transition-colors duration-300 tracking-wider">
                                            {loc.city}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 md:gap-10">
                                        <span className="text-[10px] tracking-wider uppercase text-white/30 hidden md:block">
                                            {loc.timezone}
                                        </span>
                                        <span className="text-sm text-white/50 font-light hidden sm:block">
                                            {loc.temp}
                                        </span>
                                        <span
                                            className={`text-[10px] tracking-wider uppercase ${loc.status === "Open"
                                                    ? "text-turquoise"
                                                    : "text-gold"
                                                }`}
                                        >
                                            {loc.status}
                                        </span>
                                        <motion.span className="text-white/20 group-hover:text-turquoise transition-all duration-300">
                                            →
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
