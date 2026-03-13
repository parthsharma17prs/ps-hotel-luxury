"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth springs for the outer ring
    const springConfig = { stiffness: 250, damping: 20, mass: 0.5 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth < 768) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        // Delegation for hover detection (more efficient than querying all elements)
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest("a, button, [data-cursor-hover], input, select, textarea");
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        document.body.style.cursor = "none";

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
            document.body.style.cursor = "auto";
        };
    }, [isVisible, cursorX, cursorY]);

    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Inner Dot - Fast following */}
                    <motion.div
                        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                    />

                    {/* Outer Ring - Smooth following */}
                    <motion.div
                        className="fixed top-0 left-0 rounded-full border border-turquoise/40 z-[9999] pointer-events-none mix-blend-difference selection:bg-transparent"
                        style={{
                            x: ringX,
                            y: ringY,
                            translateX: "-50%",
                            translateY: "-50%",
                            width: isHovering ? 80 : 40,
                            height: isHovering ? 80 : 40,
                        }}
                        animate={{
                            scale: isHovering ? 1.5 : 1,
                            borderColor: isHovering ? "rgba(209, 160, 112, 0.8)" : "rgba(31, 180, 180, 0.4)",
                            backgroundColor: isHovering ? "rgba(209, 160, 112, 0.15)" : "rgba(255, 255, 255, 0)",
                            borderWidth: isHovering ? "2px" : "1px",
                        }}
                        transition={{ 
                            type: "spring",
                            stiffness: 150,
                            damping: 25,
                            mass: 0.1
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}
