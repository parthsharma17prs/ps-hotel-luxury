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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}
            >
                <div className="flex items-center justify-between px-6 md:px-8 py-3">
                    {/* Logo */}
                    <Link href="/" className="relative z-50">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col items-start"
                        >
                            <span className={`font-serif text-2xl md:text-3xl tracking-wide transition-colors duration-500 ${isScrolled ? "text-foreground" : "text-white"}`}>
                                Royal Suits
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
                                    className={`text-sm font-sans font-medium tracking-wide hover:text-turquoise transition-colors duration-300 relative group ${isScrolled ? "text-foreground/80" : "text-white/90"}`}
                                >
                                    {link.label}
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
                                className={`text-xs font-sans font-medium tracking-widest uppercase px-8 py-3 transition-colors duration-500 rounded-none border-none ${isScrolled ? "bg-[#1f140f] text-white hover:bg-turquoise" : "bg-white text-black hover:bg-turquoise hover:text-white"}`}
                            >
                                Book Your Stay →
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
