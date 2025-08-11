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