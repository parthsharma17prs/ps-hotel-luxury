"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const offers = [
    {
        title: "The Ultimate Wellness Retreat",
        description: "Save 20% on a 3-night stay including daily spa treatments and organic breakfast.",
        image: "https://images.unsplash.com/photo-1591343395902-1adcb454c2e4?q=80&w=1974&auto=format&fit=crop",
        badge: "Limited Time"
    },
    {
        title: "Extended Indulgence",
        description: "Stay for 7 nights and pay for only 5. Including airport transfers and room upgrade.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop",
        badge: "Best Value"
    },
    {
        title: "Gourmet Escape",
        description: "A culinary journey through our Michelin-starred restaurants with a wine pairing masterclass.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
        badge: "New"
    }
];

export default function Specials() {
    return (
        <section id="specials" className="py-24 bg-[#F9F7F5]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Exclusive Benefits</span>
                    <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6">Specials & <span className="italic">Offers</span></h2>
                    <p className="text-foreground/60 max-w-xl mx-auto font-light">
                        Discover thoughtfully curated experiences designed to make your stay unforgettable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={offer.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-4 shadow-xl shadow-black/[0.02] border border-black/[0.03] group"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden mb-8">
                                <Image
                                    src={offer.image}
                                    alt={offer.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-[#1f140f] text-white text-[10px] tracking-widest uppercase px-3 py-1 font-bold">
                                    {offer.badge}
                                </div>
                            </div>
                            <div className="px-2 pb-4">
                                <h3 className="font-serif text-2xl mb-4 group-hover:text-turquoise transition-colors">{offer.title}</h3>
                                <p className="text-sm text-foreground/70 mb-8 leading-relaxed font-light">
                                    {offer.description}
                                </p>
                                <button className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-turquoise hover:border-turquoise transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
