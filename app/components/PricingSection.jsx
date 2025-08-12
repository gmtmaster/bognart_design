'use client';

import React from 'react';
import { plans } from "@/constants";

export default function PricingSection() {
    return (
        <section id="szolgaltatasok" className="py-24 bg-[#f4f1ec] text-black">
            <h2 className="text-4xl font-bold text-center mb-12">Szolgáltatások</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-9xl mx-auto px-4">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className="relative group border-2 bg-white/70 border-[rgba(120,53,15,0.3)] rounded-3xl p-8 text-center transition-all duration-300 ease-in-out overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,53,15,0.3)] h-full flex flex-col"
                    >
                        {/* hover ripple */}
                        <div className="absolute inset-0 scale-0 group-hover:scale-[3] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[rgba(120,53,15,0.1)] rounded-3xl z-0" />

                        <div className="relative z-10 flex-1 flex flex-col">
                            {/* Fixed-height image wrapper */}
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


                            {/* push button to bottom if content is short */}
                            <div className="mt-auto">
                                <button className="button">Kiválszt</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
