'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cards } from "@/constants";


gsap.registerPlugin(ScrollTrigger);

function Cards() {
    const wrapperRef = useRef(null);
    const trackRef = useRef(null);

    useGSAP(() => {
        const cards = trackRef.current;
        const scrollAmount = cards.scrollWidth - window.innerWidth;

        const tween = gsap.to(cards, {
            x: -scrollAmount,
            ease: 'none',
        });

        ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            animation: tween,
            markers: true,
        });
    }, []);

    return (
        <section id="cardsWrapper" className="cardsWrapper " ref={wrapperRef}>

        <div className="cardsTrack" ref={trackRef}>

                {/* 🔧 Custom first card — modify freely */}
            <div className="ml-4 py-40 px-10 md:px-20 lg:px-40 bg-amber-600/10 rounded-2xl shadow-xl flex flex-col">
                <p className="uppercase text-sm font-semibold tracking-wide text-gray-500">Projects</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-2">
                    From <span className="text-amber-700/40">front-end development</span> to <br />
                    crafting beautiful, functional digital spaces.
                </h2>
                <p className="text-lg text-gray-700 mt-4 max-w-3xl">
                    I specialize in building interactive, accessible, and purpose-driven websites. I'm passionate about crafting web experiences that are both functional and emotionally resonant.
                </p>

                <div className="bg-white/50 rounded-2xl p-10 shadow-xl border border-white mt-12 max-w-[30vw]">
                    <div>
                        <h3 className="text-xl font-bold">Lépj Velem Kapcsolatba</h3>
                    </div>

                    <div >
                        <button className="button mt-4 md:max-w-1/3" href="#kapcsolat" >
                            Kapcsolat
                        </button>
                    </div>
                </div>


            </div>

                {/* 🔁 Mapped feature cards */}
            {cards.map(({ title, img, link, desc }) => (
                <div key={title} className="cards group relative overflow-hidden">
                    <a href={link} target="_blank" rel="noreferrer" className="block w-full h-full relative">

                        {/* Image appears on hover */}
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Overlay content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                            <h3 className="text-white text-3xl font-bold mb-2">{title}</h3>
                            <p className="text-white text-sm opacity-80 max-w-md">{desc}</p>
                        </div>

                        {/* Optional dark base background for contrast */}
                        <div className="absolute inset-0 bg-amber-600/10"></div>
                    </a>
                </div>
            ))}


        </div>
        </section>
    );
}

export default Cards;