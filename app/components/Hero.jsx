'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {


    return (
        <section id="hero" className="relative min-h-screen flex items-center px-4 overflow-hidden">



            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                className="container mx-auto text-center"
            >
                <h1 className="text-3xl md:text-5xl font-bold pb-[150px]">
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
