"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TOTAL_FRAMES = 924;


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

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(5, "0");
            img.src = `/sequence-1/${paddedIndex}.jpg`;
            img.onload = () => {
                loaded++;
                setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
                if (loaded === TOTAL_FRAMES) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                loaded++;
                setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
            };
            loadedImages[i - 1] = img;
        }

        setImages(loadedImages);
    }, []);

    // Canvas drawing
    const drawFrame = useCallback(
        (frameIndex: number) => {
            const canvas = canvasRef.current;
            if (!canvas || !images[frameIndex]) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = images[frameIndex];
            const dpr = window.devicePixelRatio || 1;

            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

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

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
        },
        [images]
    );

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
        const handleResize = () => drawFrame(currentFrameRef.current);
        window.addEventListener("resize", handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoaded, springProgress, drawFrame]);

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

                {/* Text overlay - appears after frame 300 */}
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
                        <motion.a
                            href="#booking"
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#1A1A1A" }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-outline inline-block"
                        >
                            Schedule Your Stay
                        </motion.a>
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
