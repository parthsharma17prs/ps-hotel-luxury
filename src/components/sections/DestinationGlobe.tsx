"use client";

import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";
import Image from "next/image";

export default function DestinationGlobe() {
    return (
        <section className="relative h-screen w-full overflow-hidden" id="globe">
            <Image
                src="https://images.unsplash.com/photo-1549221545-0d04b8689531?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt="Global Night View"
                fill
                className="object-cover z-0 opacity-80"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-[1]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
                <FadeIn>
                    <p className="subtitle text-turquoise-light mb-6">
                        Global Presence
                    </p>
                </FadeIn>

                <TextScrollReveal
                    text="Twelve Destinations, One Standard of Excellence"
                    className="heading-xl text-white text-center max-w-5xl"
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
