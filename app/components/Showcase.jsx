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
                start: 'top 40%',
                end: '+=250%',
                scrub: true,
                markers: false,
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
                        <stop offset="0%" stopColor="#CA8A8A" />
                        <stop offset="50%" stopColor="#AD4949" />
                        <stop offset="100%" stopColor="#CA8A8A" />
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
                {/* STOP 01 (title in <text>, description in <foreignObject>) */}
                <g className="stop stop01">
                    <text x="180" y="50" fill="black">
                        <tspan className="text-2xl md:text-3xl">1. Kapcsolat felvétel az ügyféllel</tspan>
                    </text>
                </g>
                <g className="stop stop02">
                    <text x="290" y="500" fill="black">
                        <tspan className="text-2xl md:text-3xl">2. Első személyes konzultáció</tspan>
                    </text>

                </g>
                <g className="stop stop03">
                    <text x="140" y="800" fill="black">
                        <tspan className="text-2xl md:text-3xl">3. Tervezési folyamat és költségvetés</tspan>
                    </text>

                </g>
                <g className="stop stop04">
                    <text x="0" y="1100" fill="black">
                        <tspan className="max-w-lg text-2xl md:text-3xl">4. Tervezési folyamat kezdete</tspan>
                    </text>

                </g>
                <g className="stop stop05">
                    <text x="210" y="1400" fill="black">
                        <tspan className="text-2xl md:text-3xl">5. Második személyes konzultáció</tspan>
                    </text>

                </g>
                <g className="stop stop06">
                    <text x="80" y="1750" fill="black">
                        <tspan className="text-2xl md:text-3xl">6. Második tervezési szakasz</tspan>
                    </text>

                </g>
                <g className="stop stop07">
                    <text x="260" y="2000" fill="black">
                        <tspan className="text-2xl md:text-3xl">7. Harmadik személyes konzultáció</tspan>
                    </text>

                </g>
                <g className="stop stop08">
                    <text x="0" y="2300" fill="black">
                        <tspan x="10" dy="0" className="text-2xl md:text-3xl">
                            8. Végleges tervdokumentáció
                        </tspan>
                        <tspan x="10" dy="1.2em" className="text-2xl md:text-3xl">
                            átadása
                        </tspan>
                    </text>


                </g>
                <g className="stop stop09">
                    <text x="270" y="2500" fill="black">
                        <tspan className="text-2xl md:text-3xl">9. Kivitelezés támogatása</tspan>
                    </text>

                </g>


            </svg>
            </div>

            <div>

            </div>
        </section>
    );
};

export default GreenLineScroll;
