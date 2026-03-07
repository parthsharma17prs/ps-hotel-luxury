"use client";

import { useState, useRef, useEffect } from "react";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";

const BACKGROUND_VIDEOS = [
    "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-luxury-pool-and-palm-trees-1454-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-resort-in-the-maldives-1453-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-sunset-at-a-lake-in-the-swiss-alps-4436-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-low-angle-shot-of-a-luxury-hotel-hallway-48301-large.mp4"
];

export default function DestinationGlobe() {
    const [videoIndex, setVideoIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideoEnd = () => {
        setVideoIndex((prev) => (prev + 1) % BACKGROUND_VIDEOS.length);
    };

    // Force play on mount and index change
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevent notice:", error);
            });
        }
    }, [videoIndex]);

    return (
        <section className="relative h-screen w-full overflow-hidden" id="globe">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                disablePictureInPicture
                onEnded={handleVideoEnd}
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-70 pointer-events-none"
            >
                <source src={BACKGROUND_VIDEOS[videoIndex]} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6 pointer-events-none">
                <FadeIn>
                    <p className="subtitle text-turquoise-light mb-6">
                        Global Presence
                    </p>
                </FadeIn>

                <TextScrollReveal
                    text="Twelve Destinations, One Standard of Excellence"
                    className="heading-xl text-gold text-center max-w-5xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                />

                <FadeIn delay={0.3}>
                    <p className="text-white/50 text-center max-w-2xl mt-8 font-light leading-relaxed">
                        Spanning four continents, every PRS Hotel property carries the same
                        unwavering commitment to luxury, privacy, and personalized service
                        that has defined our legacy.
                    </p>
                </FadeIn>

                <FadeIn delay={0.5}>
                    <div className="flex items-center gap-8 mt-12">
                        <div className="text-center">
                            <span className="font-serif text-3xl md:text-4xl text-turquoise-light block">4</span>
                            <span className="text-[10px] tracking-ultra uppercase text-white/40">Continents</span>
                        </div>
                        <div className="w-[1px] h-10 bg-white/20" />
                        <div className="text-center">
                            <span className="font-serif text-3xl md:text-4xl text-turquoise-light block">12</span>
                            <span className="text-[10px] tracking-ultra uppercase text-white/40">Properties</span>
                        </div>
                        <div className="w-[1px] h-10 bg-white/20" />
                        <div className="text-center">
                            <span className="font-serif text-3xl md:text-4xl text-turquoise-light block">8</span>
                            <span className="text-[10px] tracking-ultra uppercase text-white/40">Countries</span>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

