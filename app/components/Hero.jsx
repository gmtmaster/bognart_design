'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section
            id="hero"
            aria-labelledby="hero-cim"
            className="relative min-h-screen flex items-center px-4 overflow-hidden"
        >
            {/* Dekoratív háttér (ha van), képernyőolvasók elől elrejtve */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0"></div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                className="container mx-auto text-center"
            >
                {/* 1 oldal = 1 H1 ajánlott */}
                <h1 id="hero-cim" className="text-3xl md:text-5xl font-bold pb-[150px] pt-[130px]">
                    Időtálló tervezés, harmonikus részletekkel
                </h1>

                <figure className="mx-auto max-w-3xl rounded-2xl border border-white/40 bg-white/30 backdrop-blur-2xl shadow-xl p-8">
                    {/* Blockquote szemantikusan helyes, opcionálisan: cite attribútum (URL) */}
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
