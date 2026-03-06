"use client";

import { motion } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn, StaggerContainer, StaggerChild } from "../ui/AnimationWrappers";

const features = [
    {
        number: "01",
        title: "Bespoke Experiences",
        description:
            "From private yacht tours to helicopter excursions, every experience is tailored exclusively for you. Our concierge team crafts moments that become lifelong memories.",
    },
    {
        number: "02",
        title: "Culinary Mastery",
        description:
            "Our Michelin-starred chefs draw inspiration from local flavours and global techniques. Every meal is a journey through taste, presented as edible art.",
    },
    {
        number: "03",
        title: "Architectural Elegance",
        description:
            "Each PRS Hotel property is a testament to design excellence, seamlessly blending contemporary aesthetics with the cultural heritage of its surroundings.",
    },
    {
        number: "04",
        title: "Sustainable Luxury",
        description:
            "We believe in responsible opulence. Our properties are built and operated with a commitment to environmental stewardship without compromising on the guest experience.",
    },
];

export default function Features() {
    return (
        <section className="section-padding bg-white relative" id="features">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <FadeIn>
                        <p className="subtitle mb-6">Why PRS Hotel</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="Redefining The Art Of Hospitality"
                        className="heading-lg text-foreground"
                    />
                </div>

                <StaggerContainer className="space-y-0">
                    {features.map((feature) => (
                        <StaggerChild key={feature.number}>
                            <motion.div
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.4 }}
                                className="group border-t border-foreground/10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start cursor-default"
                            >
                                {/* Number */}
                                <div className="md:col-span-1">
                                    <span className="font-serif text-3xl md:text-4xl text-turquoise/30 group-hover:text-turquoise transition-colors duration-500">
                                        {feature.number}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="md:col-span-4">
                                    <h3 className="font-serif text-2xl md:text-3xl tracking-wider group-hover:text-turquoise transition-colors duration-500">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-6">
                                    <p className="body-text">{feature.description}</p>
                                </div>

                                {/* Arrow */}
                                <div className="md:col-span-1 flex justify-end">
                                    <motion.span
                                        className="text-foreground/20 group-hover:text-turquoise group-hover:translate-x-2 transition-all duration-500 text-xl"
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </motion.div>
                        </StaggerChild>
                    ))}
                    <div className="border-t border-foreground/10" />
                </StaggerContainer>
            </div>
        </section>
    );
}
