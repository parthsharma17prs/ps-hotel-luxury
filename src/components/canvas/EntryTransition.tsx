"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TOTAL_FRAMES = 444;


export default function EntryTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
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

    const textOpacity = useTransform(springProgress, [0.25, 0.35], [0, 1]);
    const textY = useTransform(springProgress, [0.25, 0.4], [80, 0]);
    const textScale = useTransform(springProgress, [0.25, 0.4], [0.9, 1]);
    const overlayOpacity = useTransform(springProgress, [0.2, 0.35], [0, 0.55]);

    // Preload
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(5, "0");
            img.src = `/sequence-2/${paddedIndex}.jpg`;
            img.onload = () => {
                loaded++;
                if (loaded === TOTAL_FRAMES) setIsLoaded(true);
            };
            loadedImages[i - 1] = img;
        }
        setImages(loadedImages);
    }, []);

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

    useEffect(() => {
        if (!isLoaded) return;

        const unsubscribe = springProgress.on("change", (v) => {
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.round(v * (TOTAL_FRAMES - 1)))
            );

            if (frameIndex !== currentFrameRef.current) {
                currentFrameRef.current = frameIndex;
                requestAnimationFrame(() => drawFrame(frameIndex));
            }
        });

        drawFrame(0);

        const handleResize = () => drawFrame(currentFrameRef.current);
        window.addEventListener("resize", handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoaded, springProgress, drawFrame]);

    return (
        <section ref={containerRef} className="relative h-[350vh]" id="transition">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Overlay */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
                />

                {/* Text reveal after frame ~600 (sequence-2 frame ~120) */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY, scale: textScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10"
                >
                    <div className="text-center px-6">
                        <motion.div className="overflow-hidden mb-4">
                            <p className="text-turquoise-light text-xs tracking-ultra uppercase">
                                Step inside
                            </p>
                        </motion.div>
                        <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-white tracking-wider leading-tight mb-6">
                            You deserve
                            <br />
                            <span className="italic text-gold">it.</span>
                        </h2>
                        <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
                            Step beyond the ordinary and into a realm where opulence meets serenity.
                            Every space curated for those who appreciate the finer things.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
