"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}

export function ParallaxSection({
    children,
    className = "",
    speed = 0.3,
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    once?: boolean;
}

export function FadeIn({
    children,
    className = "",
    delay = 0,
    direction = "up",
    once = true,
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const directionMap = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: directionMap[direction].y,
                x: directionMap[direction].x,
            }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, x: 0 }
                    : {
                        opacity: 0,
                        y: directionMap[direction].y,
                        x: directionMap[direction].x,
                    }
            }
            transition={{
                duration: 0.8,
                delay,
                ease: [0.76, 0, 0.24, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface ScaleInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function ScaleIn({ children, className = "", delay = 0 }: ScaleInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.76, 0, 0.24, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerContainer({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChild({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function HorizontalParallax({
    children,
    className = "",
    direction = "left",
}: {
    children: React.ReactNode;
    className?: string;
    direction?: "left" | "right";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "left" ? [100, -100] : [-100, 100]
    );

    return (
        <motion.div ref={ref} style={{ x }} className={className}>
            {children}
        </motion.div>
    );
}
