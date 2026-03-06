"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn, ScaleIn } from "../ui/AnimationWrappers";

const galleryItems = [
    { span: "col-span-2 row-span-2", label: "The Grand Lobby", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { span: "col-span-1 row-span-1", label: "Ocean Suite", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { span: "col-span-1 row-span-1", label: "Infinity Pool", image: "https://images.unsplash.com/photo-1572365287010-44ecb2d1d0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { span: "col-span-1 row-span-2", label: "Spa Terrace", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { span: "col-span-1 row-span-1", label: "Private Beach", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { span: "col-span-1 row-span-1", label: "Fine Dining", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export default function Gallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    return (
        <section
            ref={sectionRef}
            className="section-padding bg-white relative"
            id="gallery"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <FadeIn>
                        <p className="subtitle mb-6">Visual Stories</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="A Glimpse Into Paradise"
                        className="heading-lg text-foreground"
                    />
                </div>

                <motion.div
                    style={{ scale }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]"
                >
                    {galleryItems.map((item, i) => (
                        <ScaleIn key={item.label} delay={i * 0.08}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.4 }}
                                className={`${item.span} relative overflow-hidden group cursor-pointer bg-cream`}
                            >
                                {/* Image */}
                                <Image
                                    src={item.image}
                                    alt={item.label}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-700 flex items-end justify-start p-6">
                                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <p className="text-white font-serif text-xl tracking-wider">
                                            {item.label}
                                        </p>
                                        <div className="w-8 h-[1px] bg-turquoise mt-2" />
                                    </div>
                                </div>
                            </motion.div>
                        </ScaleIn>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
