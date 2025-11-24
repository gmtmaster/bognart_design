'use client';

import React from 'react';
import Image from 'next/image';
import { partners } from '@/constants';

export default function Partners() {
    return (
        <section
            id="partnerek"
            aria-labelledby="partnerek-cim"
            className="bg-[#f4f1ec] py-12"
        >
            {/* Cím */}
            <div className="flex bg-white/60 rounded-2xl max-w-xs shadow-md py-2 justify-center mb-14 items-center mx-auto text-center border-2 border-[rgba(120,53,15,0.3)]">
                <h2 id="partnerek-cim" className="text-3xl lg:text-4xl font-bold text-black">
                    Partnerek
                </h2>
            </div>

            {/* --- STABIL MARQUEE --- */}
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f4f1ec] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f4f1ec] to-transparent" />

                <div className="flex w-max animate-marquee-new hover:[animation-play-state:paused]">
                    {[...partners, ...partners].map((p, i) => (
                        <div key={`${p.name}-${i}`} className="mx-10">
                            <figure className="partner-card flex items-center justify-center rounded-xl border border-stone-200 bg-white/70 backdrop-blur px-6 py-4 shadow-sm">
                                <Image
                                    src={p.logo}
                                    alt={p.name}
                                    width={140}
                                    height={60}
                                    className="h-10 w-auto object-contain"
                                />
                                <figcaption className="sr-only">{p.name}</figcaption>
                            </figure>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-new {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee-new {
                    animation: marquee-new 25s linear infinite;
                }
            `}</style>
        </section>
    );
}
