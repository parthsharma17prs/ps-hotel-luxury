"use client";

import { motion } from "framer-motion";

export default function PromotionalRibbon() {
    return (
        <div className="w-full bg-[#f8f5f0] overflow-hidden py-6 border-y border-foreground/5 relative z-20">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 20, // Slightly slower for readability at larger size
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex whitespace-nowrap"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-24 px-8">
                        <span className="text-[#1f140f] font-serif italic font-semibold text-4xl md:text-7xl lg:text-9xl tracking-[-0.02em] py-4">
                            Exclusive Flash Sale • 25% Off All Bookings • Limited Time Only • Best Rate Guaranteed •
                        </span>
                        <span className="text-[#1f140f] font-serif italic font-semibold text-4xl md:text-7xl lg:text-9xl tracking-[-0.02em] py-4">
                            Royal Suites Experience • Luxury Escape • 25% Off All Bookings •
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
