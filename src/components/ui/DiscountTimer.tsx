"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ticket } from "lucide-react";

export default function DiscountTimer() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Only show after 2 seconds
        const timer = setTimeout(() => {
            if (!isDismissed) setIsVisible(true);
        }, 2000);

        // Standard countdown (fixed 2 hour window for demo)
        const countdown = setInterval(() => {
            const now = new Date();
            const end = new Date();
            end.setHours(now.getHours() + 2); // 2 hours from now

            // For a real app, you'd use a fixed target date
            // Let's just make it count down from 01:59:59 based on the hour
            const minutes = 59 - now.getMinutes();
            const seconds = 59 - now.getSeconds();
            const hours = 1; // Always show 1 hour left for aesthetic consistency

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdown);
        };
    }, [isDismissed]);

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    className="fixed bottom-6 right-6 z-[60] group"
                >
                    <div className="relative overflow-hidden bg-[#1f140f] border border-white/10 p-5 md:p-6 shadow-2xl max-w-[280px]">
                        {/* Animated gradient accent */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-turquoise via-white to-turquoise bg-[length:200%_100%] animate-shimmer" />

                        <button
                            onClick={() => setIsDismissed(true)}
                            className="absolute top-2 right-2 p-1 text-white/30 hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-turquoise/20 flex items-center justify-center text-turquoise animate-pulse">
                                    <Ticket size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] tracking-widest uppercase text-turquoise font-bold">Royal Exclusive</span>
                                    <h4 className="font-serif text-white text-lg leading-none mt-1">15% Discount</h4>
                                </div>
                            </div>

                            <p className="text-white/60 text-xs font-light leading-relaxed">
                                Book your summer escape now and enjoy complimentary breakfast & spa credits.
                            </p>

                            <div className="flex items-center justify-between gap-2 mt-2">
                                <div className="flex gap-2">
                                    <div className="flex flex-col items-center min-w-[32px]">
                                        <span className="text-white font-serif text-xl tabular-nums leading-none">
                                            {String(timeLeft.hours).padStart(2, '0')}
                                        </span>
                                        <span className="text-white/30 text-[8px] uppercase tracking-tighter mt-1">Hrs</span>
                                    </div>
                                    <span className="text-white/20 text-xl font-serif">:</span>
                                    <div className="flex flex-col items-center min-w-[32px]">
                                        <span className="text-white font-serif text-xl tabular-nums leading-none">
                                            {String(timeLeft.minutes).padStart(2, '0')}
                                        </span>
                                        <span className="text-white/30 text-[8px] uppercase tracking-tighter mt-1">Min</span>
                                    </div>
                                    <span className="text-white/20 text-xl font-serif">:</span>
                                    <div className="flex flex-col items-center min-w-[32px]">
                                        <span className="text-white font-serif text-xl tabular-nums leading-none">
                                            {String(timeLeft.seconds).padStart(2, '0')}
                                        </span>
                                        <span className="text-white/30 text-[8px] uppercase tracking-tighter mt-1">Sec</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-turquoise text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 hover:bg-white hover:text-black transition-colors"
                                >
                                    Claim
                                </motion.button>
                            </div>
                        </div>

                        {/* Background subtle decoration */}
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-turquoise/5 rounded-full blur-2xl" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
