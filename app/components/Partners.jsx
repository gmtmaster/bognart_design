'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { partners } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);



    return (
        <section className="bg-[#f4f1ec] py-12">
            <div className="flex bg-white/60 rounded-2xl max-w-xs shadow-md py-2 justify-center mb-14 items-center mx-auto text-center border-2 border-[rgba(120,53,15,0.3)]" >
                <h3 className="text-3xl lg:text-4xl font-bold text-black " >
                    Partnerek
                </h3>
            </div>


            {/* Marquee viewport */}
            <div className="marquee-viewport">
                {/* Scrolling track */}
                <div className="marquee-track">
                    {partners.map((p, i) => (
                        <article key={`${p.name}-${i}`} className="partner-card">
                            <img src={p.logo} alt={p.name} loading="lazy" />
                        </article>
                    ))}
                </div>
            </div>

        </section>
    );
}