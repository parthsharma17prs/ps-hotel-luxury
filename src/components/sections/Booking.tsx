"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextScrollReveal from "../ui/TextScrollReveal";
import { FadeIn } from "../ui/AnimationWrappers";
import { Mail, Phone, BellRing, Check } from "lucide-react";

export default function Booking() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would integrate with Razorpay
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputClasses =
        "w-full bg-transparent border-b border-foreground/15 py-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:border-turquoise focus:outline-none transition-colors duration-500";

    return (
        <section className="section-padding bg-white relative" id="booking">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cream/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left - Info */}
                    <div>
                        <FadeIn>
                            <p className="subtitle mb-6">Reserve Your Stay</p>
                        </FadeIn>
                        <TextScrollReveal
                            text="Begin Your Journey With Us"
                            className="heading-lg text-foreground mb-8"
                        />
                        <FadeIn delay={0.2}>
                            <p className="body-text mb-10">
                                Whether it is a romantic escape, a family retreat, or a moment of
                                solitary reflection, let our reservations team craft the perfect
                                itinerary for your stay.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-turquoise/30 flex items-center justify-center text-turquoise flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-cinematic uppercase text-foreground/40 mb-1">
                                            Email
                                        </p>
                                        <p className="text-sm font-light">reservations@prshotel.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-turquoise/30 flex items-center justify-center text-turquoise flex-shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-cinematic uppercase text-foreground/40 mb-1">
                                            Phone
                                        </p>
                                        <p className="text-sm font-light">+91 78792 36797</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-turquoise/30 flex items-center justify-center text-turquoise flex-shrink-0">
                                        <BellRing className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-cinematic uppercase text-foreground/40 mb-1">
                                            Concierge
                                        </p>
                                        <p className="text-sm font-light">Available 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right - Form */}
                    <FadeIn delay={0.2} direction="right">
                        <form onSubmit={handleSubmit} className="space-y-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                                <select
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClasses} appearance-none cursor-pointer`}
                                >
                                    <option value="">Select Destination</option>
                                    <option value="maldives">Maldives</option>
                                    <option value="swiss-alps">Swiss Alps</option>
                                    <option value="dubai">Dubai</option>
                                    <option value="costa-rica">Costa Rica</option>
                                    <option value="tokyo">Tokyo</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
                                <input
                                    type="date"
                                    name="checkIn"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                />
                                <input
                                    type="date"
                                    name="checkOut"
                                    value={formData.checkOut}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                />
                                <select
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className={`${inputClasses} appearance-none cursor-pointer`}
                                >
                                    {[1, 2, 3, 4, 5, 6].map((n) => (
                                        <option key={n} value={n}>
                                            {n} {n === 1 ? "Guest" : "Guests"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <textarea
                                name="message"
                                placeholder="Special requests or preferences..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                className={`${inputClasses} resize-none`}
                            />

                            <div className="pt-8">
                                <AnimatePresence mode="wait">
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-3 text-turquoise"
                                        >
                                            <Check className="w-6 h-6" />
                                            <span className="text-sm tracking-widest uppercase">
                                                Thank you! We will be in touch shortly.
                                            </span>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="btn-primary w-full md:w-auto"
                                        >
                                            Request Reservation
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
