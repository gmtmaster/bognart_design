'use client';

import React from 'react';
import Image from 'next/image';
import { partners } from '@/constants';

export default function Partners() {
    // duplázott lista a seamless loop-hoz
    const loop = [...partners, ...partners];

    return (
        <section
            id="partnerek"
            aria-labelledby="partnerek-cim"
            className="bg-[#f4f1ec] py-12"
        >
            <div className="flex bg-white/60 rounded-2xl max-w-xs shadow-md py-2 justify-center mb-14 items-center mx-auto text-center border-2 border-[rgba(120,53,15,0.3)]">
                <h2 id="partnerek-cim" className="text-3xl lg:text-4xl font-bold text-black">
                    Partnerek
                </h2>
            </div>

            {/* Marquee */}
            <div
                className="group relative overflow-hidden"
                aria-label="Partnereink logói folyamatosan görgetve"
                role="region"
            >
                {/* szélek kifuttatott maszkja */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f4f1ec] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f4f1ec] to-transparent" />

                <ul
                    className="flex items-center gap-10 pr-10 will-change-transform animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
                    role="list"
                    aria-live="off"
                >
                    {loop.map((p, i) => (
                        <li key={`${p.name}-${i}`} className="shrink-0">
                            <figure className="partner-card flex items-center justify-center rounded-xl border border-stone-200 bg-white/70 backdrop-blur px-6 py-4 shadow-sm">
                                <Image
                                    src={p.logo}
                                    alt={p.name}
                                    width={140}
                                    height={60}
                                    className="h-10 w-auto object-contain"
                                    loading={i < partners.length ? 'eager' : 'lazy'}
                                />
                                <figcaption className="sr-only">{p.name}</figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>

            {/* styled-jsx: kulcsframe + sebesség állítás */}
            <style jsx>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; transform: none; }
        }
      `}</style>
        </section>
    );
}
