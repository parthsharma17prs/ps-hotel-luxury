"use client";

import { motion } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn, ScaleIn } from "../ui/AnimationWrappers";
import Image from "next/image";

const offers = [
    {
        title: "Advance Purchase Offer",
        desc: "Book up to 14 days in advance and get 15% off the Best Available Rate. Enjoy a luxurious stay with premium amenities.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        validity: "Valid till 31 Dec 2026",
    },
    {
        title: "Stay Long & Save More",
        desc: "Stay for 3 nights or more and receive an exclusive 20% discount on your entire stay. Breakfast included.",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        validity: "Valid till 30 Sep 2026",
    },
    {
        title: "Romantic Getaway",
        desc: "Treat your loved one to a magical escape featuring a private dinner, couple's spa treatment, and room upgrades.",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        validity: "Valid Year Round",
    },
];

export default function Offers() {
    return (
        <section className="section-padding bg-background text-foreground" id="offers">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <FadeIn>
                        <p className="subtitle mb-4 text-gold">Exclusive Deals</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="Special Offers"
                        className="heading-lg text-foreground mb-6"
                    />
                    <FadeIn delay={0.2}>
                        <p className="body-text max-w-2xl mx-auto">
                            Discover unparalleled value with our curated collection of special offers and packages designed to elevate your stay.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {offers.map((offer, i) => (
                        <ScaleIn key={offer.title} delay={i * 0.15}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-cream border border-foreground/10 overflow-hidden flex flex-col h-full group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={offer.image}
                                            alt={offer.title}
                                            fill
                                            className="object-cover transition-transform duration-700"
                                        />
                                    </motion.div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="font-serif text-2xl mb-4 tracking-wide text-foreground">
                                        {offer.title}
                                    </h3>
                                    <p className="text-foreground/60 text-sm leading-relaxed mb-6 flex-grow">
                                        {offer.desc}
                                    </p>
                                    <div className="mt-auto">
                                        <p className="text-xs uppercase tracking-widest text-gold mb-4">
                                            {offer.validity}
                                        </p>
                                        <button className="text-[10px] uppercase tracking-widest font-bold bg-foreground text-white px-6 py-2.5 hover:bg-turquoise transition-colors duration-300">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </ScaleIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
