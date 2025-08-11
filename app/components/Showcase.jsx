'use client';

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const GreenLineScroll = () => {

    const sectionRef = useRef(null);


    useGSAP(() => {
        const GreenLine = '.theGreenLine';
        const stops = gsap.utils.toArray('.stop');



        // Initial setup
        gsap.set(GreenLine, { strokeWidth: 10, drawSVG: '0%' });
        gsap.set(stops, { autoAlpha: 1, scale: 0, transformOrigin: 'center' });

        // Draw the main green line with a scroll-linked timeline
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top',
                end: '+=190%',
                scrub: true,
                markers: true,
            },
        })
            .to(GreenLine, {
                drawSVG: '0% 100%',
                strokeWidth: 20,
                ease: 'none',
            });

        // Animate each stop individually when it comes into view
        stops.forEach((stop) => {
            gsap.to(stop, {
                scale: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: stop,
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Animate final text appearance
        gsap.to('.end', {
            autoAlpha: 1,
            scrollTrigger: {
                trigger: '.stop05',
                start: 'top center+=100',
                toggleActions: 'play none none reverse',
            },
        });

        // Optional: refresh on resize
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };


    }, []);

    return (
        <section ref={sectionRef} className=" h-[2800px] text-white">
            <div>


            <svg className="mt-[30vh] w-full h-[2800px]" viewBox="0 0 600 2800">
                <defs>
                    <linearGradient id="amberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fffbeb" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                </defs>
                <path
                    className="theBlackLine"
                    d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1400 Q -150 1600 250 2000 T 0 2500"
                    fill="none"
                    stroke="#676767"
                    strokeWidth="1px"
                />
                <path
                    className="theGreenLine"
                    d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1400 Q -150 1600 250 2000 T 0 2500"
                    fill="none"
                    stroke="url(#amberGradient)"
                    strokeWidth="2px"
                />
                <text className="stop01 stop" x="280" y="200" fill="black">1. Kapcsolat felvétel az ügyféllel</text>
                <text className="stop02 stop" x="290" y="500" fill="black">2. Első személyes konzultáció</text>
                <text className="stop03 stop" x="180" y="750" fill="black">3. Tervezési folyamat és költségvetés</text>
                <text className="stop04 stop" x="-100" y="1100" fill="black">4. Tervezési folyamat kezdete</text>
                <text className="stop05 stop" x="250" y="1400" fill="black">5. Második személyes konzultáció</text>
                <text className="stop06 stop" x="100" y="1750" fill="black">6. Második tervezési folyamat</text>
                <text className="stop07 stop" x="280" y="2000" fill="black">7. Harmadik személyes konzultáció</text>
                <text className="stop08 stop" x="400" y="2400" fill="black">8. Végleges tervdokumentáció kivitelezéshez</text>
                <text className="stop09 stop" x="-200" y="2500" fill="black">9. Kivitelezés</text>
            </svg>
            </div>

            <div>

            </div>
        </section>
    );
};

export default GreenLineScroll;
