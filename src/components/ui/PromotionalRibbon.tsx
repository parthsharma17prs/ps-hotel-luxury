"use client";

import { motion } from "framer-motion";

export default function PromotionalRibbon() {
    return (
        <div className="w-full bg-gold/90 backdrop-blur-md overflow-hidden py-4 border-y border-white/10 relative z-20">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 15, // Faster speed as requested
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex whitespace-nowrap"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16 px-8">
                        <span className="text-[#1f140f] font-serif italic font-medium text-xl md:text-3xl lg:text-4xl tracking-[0.2em] uppercase py-4">
                            Exclusive Flash Sale • 25% Off All Bookings • Limited Time Only • Best Rate Guaranteed •
                        </span>
                        <span className="text-[#1f140f] font-serif italic font-medium text-xl md:text-3xl lg:text-4xl tracking-[0.2em] uppercase py-4">
                            Royal Suites Experience • Luxury Escape • 25% Off All Bookings •
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
