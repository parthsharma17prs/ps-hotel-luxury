"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show custom cursor on desktop
        if (typeof window !== "undefined" && window.innerWidth < 768) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Detect hoverable elements
        const addHoverListeners = () => {
            const hoverables = document.querySelectorAll(
                "a, button, [data-cursor-hover], input, textarea, select"
            );
            hoverables.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Re-check for hoverables periodically
        addHoverListeners();
        const interval = setInterval(addHoverListeners, 2000);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearInterval(interval);
        };
    }, [isVisible]);

    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Outer ring */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                        animate={{
                            x: mousePosition.x - (isHovering ? 24 : 16),
                            y: mousePosition.y - (isHovering ? 24 : 16),
                            width: isHovering ? 48 : 32,
                            height: isHovering ? 48 : 32,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                            mass: 0.1,
                        }}
                    >
                        <div
                            className={`w-full h-full rounded-full border transition-colors duration-300 ${isHovering ? "border-turquoise bg-turquoise/10" : "border-white/60"
                                }`}
                        />
                    </motion.div>
                    {/* Inner dot */}
                    <motion.div
                        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                        animate={{
                            x: mousePosition.x - 2,
                            y: mousePosition.y - 2,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                            mass: 0.05,
                        }}
                    >
                        <div className="w-1 h-1 rounded-full bg-white" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
