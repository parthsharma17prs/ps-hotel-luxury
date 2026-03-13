"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
    Explore: ["About", "Destinations", "Experiences", "Gallery"],
    Services: ["Concierge", "Dining", "Spa & Wellness", "Events"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Careers"],
};

export default function Footer() {
    const [timeLeft, setTimeLeft] = useState(3600 * 2.5); // 2.5 hours
    useEffect(() => {
        const t = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (secs: number) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <footer className="bg-foreground text-white border-t border-white/5">
            {/* Main footer */}
            <div className="section-padding pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="block mb-8">
                                <span className="font-serif text-3xl tracking-[0.2em] text-white">
                                    ROYAL SUITES
                                </span>
                                <span className="block text-[10px] tracking-[0.6em] uppercase text-turquoise mt-2">
                                    Luxury Regained
                                </span>
                            </Link>
                            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-10 font-light">
                                Experience unparalleled luxury across our global collection
                                of properties. A legacy of hospitality since 1985.
                            </p>

                            {/* Social links */}
                            <div className="flex gap-6">
                                {["Instagram", "Twitter", "LinkedIn", "Facebook"].map((social) => (
                                    <motion.a
                                        key={social}
                                        href="#"
                                        whileHover={{ y: -5, opacity: 1 }}
                                        className="text-white/30 hover:text-turquoise transition-all duration-300 text-[10px] tracking-widest uppercase"
                                    >
                                        {social}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Link columns */}
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h4 className="text-xs tracking-cinematic uppercase text-white/60 mb-6">
                                    {title}
                                </h4>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <Link
                                                href="#"
                                                className="text-sm text-white/30 hover:text-turquoise transition-colors duration-300 font-light"
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 px-6 md:px-12 lg:px-24 py-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
                        © 2026 ROYAL SUITES & RESORTS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-0">
                        <div className="bg-gold/10 text-gold px-4 py-2 rounded-none flex items-center justify-center gap-2 border border-gold/30">
                            <span className="font-bold tracking-widest text-[10px] uppercase">Flash Sale Ends In:</span>
                            <span className="font-mono text-sm tracking-wider">{formatTime(timeLeft)}</span>
                        </div>
                        <Link href="#booking" className="bg-gold text-foreground hover:bg-turquoise hover:text-white px-6 py-2 uppercase tracking-widest text-xs font-bold transition-colors duration-300">
                            Claim 25% Off
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
