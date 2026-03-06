"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextScrollRevealProps {
    text: string;
    className?: string;
    tag?: "h1" | "h2" | "h3" | "p" | "span";
    staggerDelay?: number;
    once?: boolean;
}

export default function TextScrollReveal({
    text,
    className = "",
    tag: Tag = "h2",
    staggerDelay = 0.03,
    once = true,
}: TextScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

    const words = text.split(" ");

    return (
        <div ref={ref} className="overflow-hidden">
            <Tag className={className}>
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                        <motion.span
                            className="inline-block"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: i * staggerDelay,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </Tag>
        </div>
    );
}
