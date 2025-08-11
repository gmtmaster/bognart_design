'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

    useGSAP(() => {
        gsap.to(".bg_image", {
            scale: 2, // ✅ animate scale here
            ease: "none",
            scrollTrigger: {
                trigger: ".bg_image",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                pin: false, // or true if you want it to stick
                markers: false,
            }
        });
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center px-4 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/hero.jpg"          // put the file in /public
                    alt=""
                    className="bg_image object-cover object-center"
                    sizes="100vw"
                />
                {/* subtle beige overlay for readability (tweak or remove) */}
                <div className="absolute inset-0 bg-stone-50/50" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                className="container mx-auto text-center"
            >
                <h1 className="text-3xl md:text-5xl font-bold mb-8">
                    Időtálló tervezés, harmonikus részletekkel
                </h1>

                <figure className="mx-auto max-w-3xl rounded-2xl border border-white/40 bg-white/30 backdrop-blur-2xl shadow-xl p-8">
                    <blockquote className="text-xl md:text-2xl">
                        “The details are not the details. They make the design.”
                    </blockquote>
                    <figcaption className="mt-4 text-gray-600 text-base md:text-lg">
                        — Charles Eames
                    </figcaption>
                </figure>
            </motion.div>
        </section>
    );
}
