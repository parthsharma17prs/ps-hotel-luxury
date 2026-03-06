"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../ui/AnimationWrappers";

export default function PromotionalBanner() {
    return (
        <section className="relative overflow-hidden section-padding bg-black py-24 border-y border-gold/20" id="promotions">
            <div className="absolute inset-0 z-0">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10 text-center">
                <FadeIn>
                    <p className="text-gold tracking-widest uppercase text-sm font-semibold mb-6">
                        Membership Privileges
                    </p>
                    <h2 className="heading-lg text-white mb-6 leading-tight">
                        Join the <span className="text-gold italic">PRS Elite</span> Club
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Unlock exclusive rates, complimentary upgrades, late checkout, and bespoke dining experiences across all our global properties when you book directly with us.
                    </p>
                    <motion.a
                        href="#booking"
                        whileHover={{ scale: 1.05, backgroundColor: "var(--gold)", color: "#000" }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase bg-transparent text-gold font-bold border border-gold hover:bg-gold transition-colors duration-300"
                    >
                        Become a Member
                    </motion.a>
                </FadeIn>
            </div>
        </section>
    );
}
