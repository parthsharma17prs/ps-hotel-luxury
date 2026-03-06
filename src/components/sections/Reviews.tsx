"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";

const reviews = [
    {
        name: "Alexandra Chen",
        location: "Hong Kong",
        rating: 5,
        text: "PRS Hotel redefined luxury for me. The attention to detail in the Maldives property was simply breathtaking. From the moment we arrived by seaplane to our overwater villa, every single moment was orchestrated to perfection.",
        date: "November 2024",
    },
    {
        name: "James Whitmore",
        location: "London, UK",
        rating: 5,
        text: "Having stayed at the finest establishments worldwide, I can confidently say PRS Hotel's Alpine Serenity retreat stands in a class of its own. The chalet was impeccably designed, and the culinary experience was Michelin-worthy.",
        date: "January 2025",
    },
    {
        name: "Priya Sharma",
        location: "Mumbai, India",
        rating: 5,
        text: "Our honeymoon at the Desert Oasis was magical beyond words. The private tented suite, the candlelit dinner under the stars, the camel safari at dawn — PRS Hotel created memories that will last our lifetime.",
        date: "December 2024",
    },
    {
        name: "Marco Rossi",
        location: "Milan, Italy",
        rating: 5,
        text: "The Tokyo property is a masterpiece of design. The penthouse suite views were extraordinary, and the blend of Japanese minimalism with luxury amenities was absolutely harmonious. Will return without hesitation.",
        date: "February 2025",
    },
    {
        name: "Sophie Laurent",
        location: "Paris, France",
        rating: 5,
        text: "I have traveled to over 60 countries and PRS Hotel consistently exceeds expectations. The Jungle Canopy treehouse suites in Costa Rica were an experience unlike anything else. Pure magic.",
        date: "October 2024",
    },
];

export default function Reviews() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={sectionRef}
            className="section-padding bg-cream/30 relative overflow-hidden"
            id="reviews"
        >
            {/* Background quote mark */}
            <div className="absolute top-20 left-10 md:left-20 pointer-events-none select-none">
                <span className="font-serif text-[20vw] text-foreground/[0.02] leading-none">
                    &ldquo;
                </span>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <FadeIn>
                        <p className="subtitle mb-6">Guest Testimonials</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="What Our Guests Say"
                        className="heading-lg text-foreground"
                    />
                </div>

                {/* Review carousel */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="text-center"
                    >
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-8">
                            {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-gold text-lg"
                                >
                                    ★
                                </motion.span>
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground/80 leading-relaxed italic mb-10">
                            &ldquo;{reviews[activeIndex].text}&rdquo;
                        </p>

                        {/* Author */}
                        <div>
                            <p className="font-serif text-lg text-foreground tracking-wider">
                                {reviews[activeIndex].name}
                            </p>
                            <p className="text-xs tracking-cinematic uppercase text-foreground/40 mt-1">
                                {reviews[activeIndex].location} • {reviews[activeIndex].date}
                            </p>
                        </div>
                    </motion.div>

                    {/* Navigation dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`transition-all duration-500 ${i === activeIndex
                                    ? "w-8 h-2 bg-turquoise"
                                    : "w-2 h-2 bg-foreground/10 hover:bg-foreground/30"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Prev/Next */}
                    <div className="flex justify-center gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                                setActiveIndex((prev) =>
                                    prev === 0 ? reviews.length - 1 : prev - 1
                                )
                            }
                            className="w-12 h-12 border border-foreground/10 flex items-center justify-center hover:border-turquoise hover:text-turquoise transition-all duration-300"
                        >
                            ←
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                                setActiveIndex((prev) =>
                                    prev === reviews.length - 1 ? 0 : prev + 1
                                )
                            }
                            className="w-12 h-12 border border-foreground/10 flex items-center justify-center hover:border-turquoise hover:text-turquoise transition-all duration-300"
                        >
                            →
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
