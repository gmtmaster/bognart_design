'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { plans } from '@/constants';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PricingSection() {
    const router = useRouter();

    const parentVariants = {
        hidden: {},
        show: {
            transition: { delayChildren: 0.7, staggerChildren: 0.2 },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 100 },
        show: (idx) => ({
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 10, duration: 0.8 },
        }),
    };

    return (
        <motion.section
            id="szolgaltatasok"
            aria-labelledby="szolgaltatasok-cim"
            className="py-24 bg-[#f4f1ec] text-black"
            variants={parentVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="flex justify-center rounded-2xl mb-14 max-w-xs shadow-md py-2 mx-auto bg-white/70 border-2 border-[rgba(120,53,15,0.3)]">
                <h2 id="szolgaltatasok-cim" className="text-4xl font-bold">
                    Szolgáltatások
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-9xl mx-auto px-4">
                {plans.map((plan, idx) => (
                    <motion.article
                        key={plan.slug || plan.title || idx}
                        variants={childVariants}
                        custom={idx}
                        className="relative group border-2 bg-white/70 border-[rgba(120,53,15,0.3)] rounded-3xl p-8 text-center transition-all duration-300 ease-in-out overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,53,15,0.3)] h-full flex flex-col"
                        aria-labelledby={`plan-cim-${idx}`}
                    >
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 scale-0 group-hover:scale-[3] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[rgba(120,53,15,0.1)] rounded-3xl z-0"
                        />

                        <div className="relative z-10 flex-1 flex flex-col">
                            <figure className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden mb-4">
                                {/* next/image a jobb teljesítményért és CLS ellen */}
                                <Image
                                    src={plan.img}
                                    alt={plan.title ? `${plan.title} – referencia` : 'Szolgáltatás illusztráció'}
                                    fill
                                    className="object-left object-cover"
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    priority={idx < 2} // az első néhányat töltsük gyorsan
                                />
                                <figcaption className="sr-only">{plan.title}</figcaption>
                            </figure>

                            <h3 id={`plan-cim-${idx}`} className="text-2xl font-semibold mb-2">
                                {plan.title}
                            </h3>

                            {plan.desc && <p className="text-md mb-10">{plan.desc}</p>}
                            {plan.question && (
                                <p className="text-md font-semibold mb-2 text-left">{plan.question}</p>
                            )}

                            {Array.isArray(plan.features) && plan.features.length > 0 && (
                                <ul className="text-sm font-medium mb-6 space-y-2 text-left list-disc list-inside">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-auto">
                                {/* Valódi link (jobb SEO + a11y). Ha muszáj router.push, maradhat a button is. */}
                                <Link href="/arajanlat" className="button inline-flex items-center justify-center">
                                    Árajánlatkérés
                                </Link>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}
