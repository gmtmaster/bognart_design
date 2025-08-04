'use client';

import React from 'react';

const plans = [
    {
        title: 'Starter',
        price: 'Free',
        features: ['1 Project', 'Community Support', 'Basic Insights'],
    },
    {
        title: 'Basic',
        price: '$9/mo',
        features: ['5 Projects', 'Email Support', 'Custom Branding'],
    },
    {
        title: 'Pro',
        price: '$29/mo',
        features: ['Unlimited Projects', 'Priority Support', 'Advanced Analytics'],
    },
    {
        title: 'Enterprise',
        price: 'Custom',
        features: ['All Pro Features', 'Dedicated Manager', 'Tailored Solution'],
    },
];

export default function PricingSection() {
    return (
        <section className="py-24 bg-white text-black">
            <h2 className="text-4xl font-bold text-center mb-12">Szolgáltatások</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-4">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className="relative group border-2 border-[rgba(120,53,15,0.3)] rounded-3xl p-8 text-center transition-all duration-300 ease-in-out overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(120,53,15,0.3)]"
                    >
                        <div className="absolute inset-0 scale-0 group-hover:scale-[3] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[rgba(120,53,15,0.1)] rounded-3xl z-0" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
                            <p className="text-3xl font-bold mb-6">{plan.price}</p>
                            <ul className="text-sm font-medium mb-6 space-y-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                            <button className="button">Árajánlatkérés</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
