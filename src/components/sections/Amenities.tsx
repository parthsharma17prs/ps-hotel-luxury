"use client";

import { motion } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn, StaggerContainer, StaggerChild } from "../ui/AnimationWrappers";

const amenities = [
    {
        icon: "🏊",
        title: "Infinity Pool",
        description: "Temperature-controlled infinity pools with panoramic views that stretch to the horizon.",
    },
    {
        icon: "🧖",
        title: "Luxury Spa",
        description: "World-class spa treatments using organic, locally-sourced ingredients and ancient techniques.",
    },
    {
        icon: "🍽️",
        title: "Fine Dining",
        description: "Michelin-starred restaurants helmed by award-winning chefs crafting unforgettable gastronomic journeys.",
    },
    {
        icon: "🏋️",
        title: "Fitness Centre",
        description: "State-of-the-art fitness facilities with personal trainers and yoga sanctuaries.",
    },
    {
        icon: "🎾",
        title: "Sports & Recreation",
        description: "Tennis courts, golf courses, and water sports for the adventurous spirit.",
    },
    {
        icon: "🍸",
        title: "Rooftop Lounge",
        description: "Signature cocktails and curated wine lists served against breathtaking skyline vistas.",
    },
    {
        icon: "👶",
        title: "Kids Club",
        description: "Creative programmes and supervised activities ensuring memorable family holidays.",
    },
    {
        icon: "🚗",
        title: "Chauffeur Service",
        description: "Complimentary luxury transfers and bespoke excursion arrangements.",
    },
];

export default function Amenities() {
    return (
        <section className="section-padding bg-cream/50 relative overflow-hidden" id="amenities">
            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-turquoise/20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-turquoise/20" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <FadeIn>
                        <p className="subtitle mb-6">World-Class Amenities</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="Everything You Could Ever Dream Of"
                        className="heading-lg text-foreground"
                    />
                    <FadeIn delay={0.2}>
                        <p className="body-text max-w-2xl mx-auto mt-6">
                            Every amenity at PS Hotel has been thoughtfully designed to elevate your
                            stay from exceptional to extraordinary.
                        </p>
                    </FadeIn>
                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {amenities.map((amenity) => (
                        <StaggerChild key={amenity.title}>
                            <motion.div
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 20px 40px rgba(31, 180, 180, 0.08)",
                                }}
                                transition={{ duration: 0.4 }}
                                className="group bg-white p-8 relative overflow-hidden"
                            >
                                {/* Hover accent */}
                                <motion.div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-turquoise/5 to-transparent group-hover:h-full transition-all duration-700" />

                                <div className="relative z-10">
                                    <span className="text-3xl mb-6 block">{amenity.icon}</span>
                                    <h3 className="font-serif text-xl tracking-wider mb-3 group-hover:text-turquoise transition-colors duration-500">
                                        {amenity.title}
                                    </h3>
                                    <p className="text-foreground/50 text-sm leading-relaxed">
                                        {amenity.description}
                                    </p>
                                </div>

                                {/* Corner line */}
                                <div className="absolute top-0 right-0 w-0 h-[2px] bg-turquoise group-hover:w-12 transition-all duration-500 delay-200" />
                                <div className="absolute top-0 right-0 w-[2px] h-0 bg-turquoise group-hover:h-12 transition-all duration-500 delay-200" />
                            </motion.div>
                        </StaggerChild>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
