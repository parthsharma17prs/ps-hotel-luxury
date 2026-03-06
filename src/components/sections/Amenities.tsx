"use client";

import { motion } from "framer-motion";
import { Waves, Sparkles, Utensils, Dumbbell, Trophy, Martini, Baby, CarFront } from "lucide-react";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn, StaggerContainer, StaggerChild } from "../ui/AnimationWrappers";

const amenities = [
    {
        icon: <Waves className="w-8 h-8 text-gold" />,
        title: "Infinity Pool",
        description: "Temperature-controlled infinity pools with panoramic views that stretch to the horizon.",
    },
    {
        icon: <Sparkles className="w-8 h-8 text-gold" />,
        title: "Luxury Spa",
        description: "World-class spa treatments using organic, locally-sourced ingredients and ancient techniques.",
    },
    {
        icon: <Utensils className="w-8 h-8 text-gold" />,
        title: "Fine Dining",
        description: "Michelin-starred restaurants helmed by award-winning chefs crafting unforgettable gastronomic journeys.",
    },
    {
        icon: <Dumbbell className="w-8 h-8 text-gold" />,
        title: "Fitness Centre",
        description: "State-of-the-art fitness facilities with personal trainers and yoga sanctuaries.",
    },
    {
        icon: <Trophy className="w-8 h-8 text-gold" />,
        title: "Sports & Recreation",
        description: "Tennis courts, golf courses, and water sports for the adventurous spirit.",
    },
    {
        icon: <Martini className="w-8 h-8 text-gold" />,
        title: "Rooftop Lounge",
        description: "Signature cocktails and curated wine lists served against breathtaking skyline vistas.",
    },
    {
        icon: <Baby className="w-8 h-8 text-gold" />,
        title: "Kids Club",
        description: "Creative programmes and supervised activities ensuring memorable family holidays.",
    },
    {
        icon: <CarFront className="w-8 h-8 text-gold" />,
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
                            Every amenity at PRS Hotel has been thoughtfully designed to elevate your
                            stay from exceptional to extraordinary.
                        </p>
                    </FadeIn>
                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {amenities.map((amenity) => (
                        <StaggerChild key={amenity.title}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="group bg-cream p-8 relative overflow-hidden transition-all duration-500 rounded-none shadow-sm hover:shadow-xl"
                            >
                                {/* Hover accent */}
                                <motion.div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-turquoise/5 to-transparent group-hover:h-full transition-all duration-700" />

                                <div className="relative z-10">
                                    <div className="mb-6 block">{amenity.icon}</div>
                                    <h3 className="font-serif text-xl tracking-wider mb-3 group-hover:text-turquoise transition-colors duration-500">
                                        {amenity.title}
                                    </h3>
                                    <p className="text-foreground/50 text-sm leading-relaxed">
                                        {amenity.description}
                                    </p>
                                </div>

                                <div className="absolute top-0 right-0 w-0 h-[4px] bg-turquoise group-hover:w-full transition-all duration-500 delay-100" />
                            </motion.div>
                        </StaggerChild>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
