'use client';

import React from 'react';
import { plans } from "@/constants";
import {useRouter} from "next/navigation";
import { motion } from 'framer-motion';

export default function PricingSection() {

    const router = useRouter();
    const parentVariants = {
        hidden: {},
        show: {
            transition: {
                // starts children after 0.7s, then staggers each by 0.2s
                delayChildren: 0.7,
                staggerChildren: 0.2,
            },
        },
    };
    const childVariants = {
        hidden: { opacity: 0, y: 100 },
        show: (idx) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                // exact control if you want 0.7 + idx*0.2 instead of delayChildren+staggerChildren:
                // delay: 0.7 + idx * 0.2,
                duration: 0.8,
            },
        }),
    };

    return (
        <motion.section
            id="szolgaltatasok"
            className="py-24 bg-[#f4f1ec] text-black"
            variants={parentVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="flex justify-center rounded-2xl mb-14  max-w-xs shadow-md py-2 mx-auto bg-white/70 border-2 border-[rgba(120,53,15,0.3)]">
                <h2 className="text-4xl font-bold">Szolgáltatások</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-9xl mx-auto px-4">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        variants={childVariants}
                        custom={idx}
                        className="relative group border-2 bg-white/70 border-[rgba(120,53,15,0.3)] rounded-3xl p-8 text-center transition-all duration-300 ease-in-out overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,53,15,0.3)] h-full flex flex-col"
                    >
                        <div className="absolute inset-0 scale-0 group-hover:scale-[3] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[rgba(120,53,15,0.1)] rounded-3xl z-0" />

                        <div className="relative z-10 flex-1 flex flex-col">
                            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={plan.img}
                                    alt={plan.title || 'konyha'}
                                    className="absolute inset-0 w-full h-full object-left object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
                            <p className="text-md mb-10">{plan.desc}</p>
                            <p className="text-md font-semibold mb-2 text-left">{plan.question}</p>

                            <ul className="text-sm font-medium mb-6 space-y-2 text-left list-disc list-inside">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <button onClick={() => router.push("/arajanlat")} className="button">
                                    Árajánlatkérés
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
