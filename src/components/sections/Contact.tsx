"use client";

import { motion } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
    return (
        <section className="section-padding bg-foreground text-white relative overflow-hidden" id="contact">
            {/* Animated background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <FadeIn>
                        <p className="subtitle mb-6">Get In Touch</p>
                    </FadeIn>
                    <TextScrollReveal
                        text="We Would Love To Hear From You"
                        className="heading-lg text-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <FadeIn delay={0}>
                        <motion.div
                            whileHover={{ y: -5, borderColor: "rgba(31,180,180,0.3)" }}
                            className="text-center p-10 border border-white/10"
                        >
                            <div className="mb-4 flex justify-center text-turquoise"><MapPin className="w-8 h-8" /></div>
                            <h3 className="font-serif text-xl tracking-wider mb-3">
                                Visit Us
                            </h3>
                            <p className="text-white/40 text-sm leading-relaxed">
                                PRS Hotel Headquarters
                                <br />
                                Mumbai, Maharashtra
                                <br />
                                India
                            </p>
                        </motion.div>
                    </FadeIn>

                    <FadeIn delay={0.15}>
                        <motion.div
                            whileHover={{ y: -5, borderColor: "rgba(31,180,180,0.3)" }}
                            className="text-center p-10 border border-white/10"
                        >
                            <div className="mb-4 flex justify-center text-turquoise"><Mail className="w-8 h-8" /></div>
                            <h3 className="font-serif text-xl tracking-wider mb-3">
                                Email Us
                            </h3>
                            <p className="text-white/40 text-sm leading-relaxed">
                                info@prshotel.com
                                <br />
                                careers@prshotel.com
                                <br />
                                press@prshotel.com
                            </p>
                        </motion.div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <motion.div
                            whileHover={{ y: -5, borderColor: "rgba(31,180,180,0.3)" }}
                            className="text-center p-10 border border-white/10"
                        >
                            <div className="mb-4 flex justify-center text-turquoise"><Phone className="w-8 h-8" /></div>
                            <h3 className="font-serif text-xl tracking-wider mb-3">
                                Call Us
                            </h3>
                            <p className="text-white/40 text-sm leading-relaxed">
                                +91 78792 36797
                                <br />
                                Mon - Sun, 24/7
                                <br />
                                Concierge Always Available
                            </p>
                        </motion.div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
