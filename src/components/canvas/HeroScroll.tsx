"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TOTAL_FRAMES = 200; // Drastically reduced from 924 for instant load


export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const currentFrameRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Text reveal based on scroll progress
    const textOpacity = useTransform(springProgress, [0.85, 0.9], [0, 1]);
    const textY = useTransform(springProgress, [0.85, 0.95], [60, 0]);
    const overlayOpacity = useTransform(springProgress, [0.8, 0.9], [0, 0.6]);

    // Initial Text overlay (appears at the start and fades out quickly)
    const startTextOpacity = useTransform(springProgress, [0, 0.15], [1, 0]);
    const startTextY = useTransform(springProgress, [0, 0.15], [0, -60]);

    // Optimized Preload Strategy: Load first 30 frames for immediate show, then lazy load the rest
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loaded = 0;
        const CRITICAL_FRAMES = 30; // Min frames needed to start the experience

        const loadFrame = (i: number) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                // Assumes we have a downsampled or smaller set of images
                const paddedIndex = i.toString().padStart(5, "0");
                img.src = `/sequence-1/${paddedIndex}.jpg`;

                img.onload = () => {
                    loaded++;
                    loadedImages[i - 1] = img;
                    const progress = Math.round((loaded / TOTAL_FRAMES) * 100);
                    setLoadProgress(progress);

                    if (loaded >= CRITICAL_FRAMES && !isLoaded) {
                        setIsLoaded(true);
                    }
                    resolve();
                };
                img.onerror = () => {
                    loaded++;
                    const progress = Math.round((loaded / TOTAL_FRAMES) * 100);
                    setLoadProgress(progress);
                    resolve();
                };
            });
        };

        // Load critical frames first
        const loadSequence = async () => {
            // Priority 1: First 30
            for (let i = 1; i <= CRITICAL_FRAMES; i++) {
                await loadFrame(i);
            }

            // Priority 2: Rest in chunks
            for (let i = CRITICAL_FRAMES + 1; i <= TOTAL_FRAMES; i++) {
                loadFrame(i); // Non-blocking lazy load
            }
            setImages(loadedImages);
        };

        loadSequence();
    }, [isLoaded]);

    // Draw initial frame and resize logic
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
    }, []);

    const drawFrame = useCallback(
        (frameIndex: number) => {
            const canvas = canvasRef.current;
            if (!canvas || !images[frameIndex]) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = images[frameIndex];

            // Draw image with cover behavior
            const canvasW = window.innerWidth;
            const canvasH = window.innerHeight;
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = canvasW / canvasH;

            let drawW: number, drawH: number, drawX: number, drawY: number;

            if (imgRatio > canvasRatio) {
                drawH = canvasH;
                drawW = canvasH * imgRatio;
                drawX = (canvasW - drawW) / 2;
                drawY = 0;
            } else {
                drawW = canvasW;
                drawH = canvasW / imgRatio;
                drawX = 0;
                drawY = (canvasH - drawH) / 2;
            }

            ctx.clearRect(0, 0, canvasW, canvasH);
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
        },
        [images]
    );

    // Initial canvas setup
    useEffect(() => {
        resizeCanvas();
    }, [resizeCanvas]);

    // Animate canvas on scroll
    useEffect(() => {
        if (!isLoaded) return;

        const unsubscribe = springProgress.on("change", (v) => {
            // Speed up the frame sequence so it finishes at around v = 0.85
            const frameV = Math.min(1, v * 1.18);
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.round(frameV * (TOTAL_FRAMES - 1)))
            );

            if (frameIndex !== currentFrameRef.current) {
                currentFrameRef.current = frameIndex;
                requestAnimationFrame(() => drawFrame(frameIndex));
            }
        });

        // Draw initial frame
        drawFrame(0);

        // Handle resize
        const handleResize = () => {
            resizeCanvas();
            drawFrame(currentFrameRef.current);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoaded, springProgress, drawFrame, resizeCanvas]);

    return (
        <section ref={containerRef} className="relative h-[800vh]" id="hero">
            {/* Loading screen */}
            {!isLoaded && (
                <div className="fixed inset-0 z-50 bg-foreground flex flex-col items-center justify-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <h1 className="font-serif text-4xl md:text-6xl text-white tracking-cinematic mb-4">
                            PS HOTEL
                        </h1>
                        <p className="text-white/40 text-xs tracking-ultra uppercase">
                            Preparing your experience
                        </p>
                    </motion.div>

                    <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-turquoise to-turquoise-light"
                            initial={{ width: "0%" }}
                            animate={{ width: `${loadProgress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-white/30 text-xs tracking-widest font-mono">
                        {loadProgress}%
                    </p>
                </div>
            )}

            {/* Sticky canvas container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Dark gradient overlay for text readability */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
                />

                {/* Starting Text: PRS HOTELS */}
                <motion.div
                    style={{ opacity: startTextOpacity, y: startTextY }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <div className="text-center px-4">
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white tracking-widest leading-none drop-shadow-2xl">
                            PRS HOTELS
                        </h1>
                        <p className="mt-4 text-white/80 text-sm md:text-base tracking-[0.3em] uppercase drop-shadow-lg">
                            An experience beyond luxury
                        </p>
                    </div>
                </motion.div>

                {/* Intermediate Text: The Service (NEW) */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.08, 0.16, 0.24], [0, 1, 0]),
                        scale: useTransform(springProgress, [0.08, 0.24], [0.98, 1.02])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <div className="text-center px-4">
                        <span className="text-turquoise-light text-[10px] tracking-[0.6em] uppercase mb-4 block">Personalized</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wider leading-tight">
                            Service at <br /> <span className="italic">Every Touch</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Intermediate Text 1: The Design */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.28, 0.38, 0.48], [0, 1, 0]),
                        y: useTransform(springProgress, [0.28, 0.48], [40, -40])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <div className="text-center px-4">
                        <span className="text-turquoise-light text-[10px] tracking-[0.5em] uppercase mb-4 block">Craftsmanship</span>
                        <h2 className="font-serif text-4xl md:text-6xl text-white tracking-wider leading-tight">
                            Every Detail <br /> <span className="italic">Redefined</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Intermediate Text 2: The Ambience */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.52, 0.62, 0.72], [0, 1, 0]),
                        scale: useTransform(springProgress, [0.52, 0.72], [0.95, 1.05])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <div className="text-center px-4">
                        <span className="text-turquoise-light text-[10px] tracking-[0.5em] uppercase mb-4 block">The Atmosphere</span>
                        <h2 className="font-serif text-4xl md:text-6xl text-white tracking-wider leading-tight">
                            Timeless <br /> <span className="italic">Elegance</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Intermediate Text 3: The Sanctuary */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.75, 0.82, 0.90], [0, 1, 0]),
                        x: useTransform(springProgress, [0.75, 0.90], [-50, 50])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <div className="text-center px-4">
                        <span className="text-turquoise-light text-[10px] tracking-[0.5em] uppercase mb-4 block">Your Sanctuary</span>
                        <h2 className="font-serif text-4xl md:text-6xl text-white tracking-wider leading-tight">
                            The Peak of <br /> <span className="italic">Refinement</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Final Text overlay - appears after frame 300 */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <div className="text-center px-4 pointer-events-auto">
                        <motion.p
                            className="text-turquoise-light text-xs tracking-ultra uppercase mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Your journey begins
                        </motion.p>
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-white tracking-wider leading-tight mb-8 text-balance">
                            What are you
                            <br />
                            <span className="italic text-turquoise-light">waiting for?</span>
                        </h1>
                        <p className="text-white/60 text-sm md:text-base max-w-md mx-auto mb-10 font-light leading-relaxed">
                            Immerse yourself in a world where every detail is crafted to perfection.
                            Your sanctuary of luxury awaits.
                        </p>
                        <div className="flex flex-col items-center gap-12">
                            <motion.a
                                href="#accommodations"
                                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#1A1A1A" }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-outline inline-block"
                            >
                                Discover Our Rooms
                            </motion.a>

                            {/* Integrated Booking Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 w-full max-w-4xl flex flex-wrap items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-8 flex-1 min-w-[300px] justify-center md:justify-start">
                                    <div className="flex flex-col gap-1 border-r border-white/20 pr-8">
                                        <span className="text-[10px] tracking-widest uppercase text-white/50">Check In</span>
                                        <span className="font-serif text-sm text-white">Select Date</span>
                                    </div>
                                    <div className="flex flex-col gap-1 border-r border-white/20 pr-8">
                                        <span className="text-[10px] tracking-widest uppercase text-white/50">Check Out</span>
                                        <span className="font-serif text-sm text-white">Select Date</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] tracking-widest uppercase text-white/50">Guests</span>
                                        <span className="font-serif text-sm text-white">2 Adults, 1 Child</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#1f140f" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-turquoise text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-colors"
                                >
                                    Check Availability
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                {isLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
                    >
                        <span className="text-white/40 text-[10px] tracking-ultra uppercase">
                            Scroll to explore
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[1px] h-8 bg-gradient-to-b from-turquoise to-transparent"
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
}
