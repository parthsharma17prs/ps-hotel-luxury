"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Destinations", href: "#destinations" },
    { label: "Amenities", href: "#amenities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
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
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-0 left-0 w-full z-50 transition-all duration-700 bg-transparent"
            >
                <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 md:py-5">
                    {/* Logo */}
                    <Link href="/" className="relative z-50">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col items-start"
                        >
                            <span className="font-serif text-2xl md:text-3xl tracking-cinematic transition-colors duration-500 text-white">
                                PRS HOTEL
                            </span>
                            <span className="text-[9px] tracking-ultra uppercase transition-colors duration-500 text-turquoise">
                                Luxury Redefined
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-xs tracking-cinematic uppercase font-light hover:text-turquoise transition-colors duration-300 relative group text-white/90"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-turquoise group-hover:w-full transition-all duration-500" />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* CTA + Hamburger */}
                    <div className="flex items-center gap-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="hidden md:block"
                        >
                            <Link
                                href="#booking"
                                className="text-xs tracking-cinematic uppercase px-6 py-3 border transition-all duration-500 border-white/50 text-white hover:bg-white hover:text-black"
                            >
                                Book Now
                            </Link>
                        </motion.div>

                        {/* Hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                            aria-label="Toggle Menu"
                        >
                            <motion.span
                                animate={{
                                    rotate: isMenuOpen ? 45 : 0,
                                    y: isMenuOpen ? 6 : 0,
                                }}
                                className={`block w-6 h-[1.5px] transition-colors duration-300 ${isMenuOpen || !isScrolled ? "bg-white" : "bg-foreground"
                                    }`}
                            />
                            <motion.span
                                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                                className={`block w-4 h-[1.5px] transition-colors duration-300 ${isMenuOpen || !isScrolled ? "bg-white" : "bg-foreground"
                                    }`}
                            />
                            <motion.span
                                animate={{
                                    rotate: isMenuOpen ? -45 : 0,
                                    y: isMenuOpen ? -6 : 0,
                                }}
                                className={`block w-6 h-[1.5px] transition-colors duration-300 ${isMenuOpen || !isScrolled ? "bg-white" : "bg-foreground"
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-40 bg-foreground/95 backdrop-blur-xl flex items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{
                                        delay: 0.1 * i,
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1],
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-serif text-4xl md:text-5xl text-white/90 hover:text-turquoise transition-colors duration-300 tracking-wider"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="mt-8"
                            >
                                <Link
                                    href="#booking"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn-primary"
                                >
                                    Book Now
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
