"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "About", href: "/about" },
    { label: "Accommodations", href: "/accommodations" },
    { label: "Destinations", href: "/destinations" },
    { label: "Amenities", href: "/amenities" },
    { label: "Specials", href: "/specials" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(pathname !== "/");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        setIsVisible(pathname !== "/");
    }, [pathname]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (pathname === "/") {
            // Show strictly after the hero section ends
            setIsScrolled(latest > 0.15);
            setIsVisible(latest > 0.15);
        } else {
            setIsScrolled(latest > 0.05);
            setIsVisible(true);
        }
    });

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.header
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}
                    >
                        <div className="flex items-center justify-between px-6 md:px-8 py-3">
                            {/* Logo */}
                            <Link href="/" className="relative z-50">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex flex-col items-start"
                                >
                                    <span className={`font-serif text-2xl md:text-3xl tracking-[0.1em] transition-colors duration-500 font-light ${isScrolled ? "text-foreground" : "text-white"}`}>
                                        ROYAL SUITES
                                    </span>
                                    <span className={`text-[9px] tracking-[0.5em] uppercase font-sans mt-1 transition-colors duration-500 leading-none ${isScrolled ? "text-turquoise font-medium" : "text-white/70"}`}>
                                        Luxury Redefined
                                    </span>
                                </motion.div>
                            </Link>

                            {/* Actions: Menu Toggle Only */}
                            <div className="flex items-center">
                                {/* Modern Menu Toggle Button */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="relative z-[60] flex items-center gap-4 group bg-black/5 hover:bg-black/10 p-2 rounded-full transition-all duration-300"
                                    aria-label="Toggle Menu"
                                >
                                    <span className={`hidden sm:block text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${isMenuOpen ? "text-white" : (isScrolled ? "text-foreground" : "text-white")}`}>
                                        {isMenuOpen ? "Close" : "Menu"}
                                    </span>
                                    <div className="w-10 h-10 flex flex-col justify-center items-center gap-2 relative">
                                        <motion.span
                                            animate={{
                                                rotate: isMenuOpen ? 45 : 0,
                                                y: isMenuOpen ? 5 : 0,
                                                width: isMenuOpen ? "24px" : "28px"
                                            }}
                                            className={`block h-[1.5px] transition-colors duration-500 ${isMenuOpen ? "bg-white" : (isScrolled ? "bg-foreground" : "bg-white")}`}
                                        />
                                        <motion.span
                                            animate={{
                                                rotate: isMenuOpen ? -45 : 0,
                                                y: isMenuOpen ? -5 : 0,
                                                width: isMenuOpen ? "24px" : "20px"
                                            }}
                                            className={`block h-[1.5px] transition-colors duration-500 ml-auto ${isMenuOpen ? "bg-white" : (isScrolled ? "bg-foreground" : "bg-white")}`}
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </motion.header>
                )}
            </AnimatePresence>

            {/* Premium Full-Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[55] bg-[#1f140f] flex flex-col md:flex-row"
                    >
                        {/* Left Side: Editorial Image/Video (Hidden on mobile) */}
                        <div className="hidden md:flex md:w-1/2 h-full bg-[#160d09] items-center justify-center p-20 relative overflow-hidden">
                            <div className="relative z-10 text-center">
                                <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-6 block opacity-50">Est. 1985</span>
                                <h2 className="font-serif text-5xl text-white/20 tracking-tighter leading-none select-none uppercase italic">
                                    Royal <br /> Suites
                                </h2>
                            </div>
                            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale" />
                        </div>

                        {/* Right Side: Navigation Links */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-24 py-20 bg-[#1f140f]">
                            <div className="mb-12">
                                <span className="text-turquoise text-[10px] tracking-[0.5em] uppercase mb-4 block">Navigation</span>
                            </div>

                            <nav className="flex flex-col gap-4 md:gap-6">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{
                                            delay: 0.1 * i + 0.3,
                                            duration: 0.6,
                                            ease: [0.76, 0, 0.24, 1],
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group flex items-baseline gap-4"
                                        >
                                            <span className="text-turquoise/30 text-xs font-serif italic group-hover:text-turquoise transition-colors duration-300">
                                                0{i + 1}
                                            </span>
                                            <span className="font-serif text-4xl md:text-6xl text-white/90 hover:text-turquoise transition-all duration-500 tracking-tight group-hover:pl-4">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-16 pt-12 border-t border-white/5 flex flex-wrap gap-12">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] tracking-widest uppercase text-white/30">Contact</span>
                                    <a href="mailto:concierge@royalsuites.com" className="text-white/60 hover:text-turquoise transition-colors text-sm font-light">concierge@royalsuites.com</a>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] tracking-widest uppercase text-white/30">Reservations</span>
                                    <span className="text-white/60 text-sm font-light">+91 78792 36797</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
