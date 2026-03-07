"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const accommodations = [
    {
        title: "Royal Penthouse",
        category: "Suites",
        price: "₹1,25,000",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
        features: ["Private Pool", "24/7 Butler", "Panoramic City View"]
    },
    {
        title: "Ocean Breeze Villa",
        category: "Villas",
        price: "₹85,000",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
        features: ["Beachfront", "Garden Shower", "Private Deck"]
    },
    {
        title: "Grand Deluxe Room",
        category: "Rooms",
        price: "₹45,000",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
        features: ["King Bed", "Smart Control", "Marble Bath"]
    },
    {
        title: "Skyline Suite",
        category: "Suites",
        price: "₹95,000",
        image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2070&auto=format&fit=crop",
        features: ["Floor Ceiling Windows", "Smart Lighting", "Executive Access"]
    },
    {
        title: "Garden Villa",
        category: "Villas",
        price: "₹75,000",
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop",
        features: ["Zen Garden", "Private Gazebo", "Outdoor Yoga Space"]
    }
];

export default function Accommodations() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Translate from left to right as we scroll
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

    return (
        <section id="accommodations" ref={sectionRef} className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 mb-16">
                <div className="max-w-2xl">
                    <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Exquisite Living</span>
                    <h2 className="font-serif text-4xl md:text-6xl text-foreground tracking-tight">
                        Rooms, Suites <br /> & <span className="italic">Private Villas</span>
                    </h2>
                </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div className="relative h-[600px] w-full">
                <motion.div
                    style={{ x, willChange: "transform" }}
                    className="flex gap-8 px-6 md:px-24 absolute left-0"
                >
                    {accommodations.map((item) => (
                        <div
                            key={item.title}
                            className="group cursor-pointer min-w-[350px] md:min-w-[450px]"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden mb-6">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-bold tracking-widest uppercase">
                                    From {item.price}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 to-transparent">
                                    <ul className="text-white/80 text-xs space-y-3">
                                        {item.features.map(f => (
                                            <li key={f} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-turquoise rounded-full" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-turquoise/80 font-bold">{item.category}</span>
                                <h3 className="font-serif text-2xl group-hover:text-turquoise transition-all duration-300">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
