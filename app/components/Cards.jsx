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
            markers: false,
        });
    }, []);

    return (
        <section  id="cardsWrapper" className="cardsWrapper " ref={wrapperRef}>

        <div className="cardsTrack" ref={trackRef} id="referenciak">

                {/* 🔧 Custom first card — modify freely */}
            <div className="ml-4 py-40 px-10 md:px-20 lg:px-40 bg-[#f4f1ec] rounded-2xl shadow-xl flex flex-col">
                <p className="uppercase text-md font-semibold underline tracking-wide text-gray-500">REFERENCIÁK</p>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight mt-2 lg:max-w-3xl max-w-md">
                    A <span className="bg-gradient-to-b from-amber-900/60 to-amber-900/20 bg-clip-text text-transparent">Bognart Belsőépítész Stúdióban</span> minden teret az <span className="bg-gradient-to-b from-red-900/80 to-red-700/20 bg-clip-text text-transparent">ügyfeleim életmódjához</span> igazítok — legyen az hálószoba, nappali, konyha vagy fürdőszoba.
                </h2>
                <p className="text-lg text-gray-700 mt-4 lg:max-w-3xl max-w-md">
                    Fontos számomra, hogy a terek egyszerre legyenek szépek, praktikusak és személyesek. Figyelmesen dolgozom a részleteken, hogy együtt megalkossuk az álmaid otthonát, ahol minden nap öröm és kényelem vár.
                </p>

                <div className="bg-white/50 rounded-2xl p-10 shadow-xl border border-white mt-12 max-w-sm">
                    <div>
                        <h3 className="text-xl font-bold">Lépj Velem Kapcsolatba</h3>
                    </div>

                    <div >
                        <button className="button mt-4" href="#kapcsolat" >
                            Kapcsolat
                        </button>
                    </div>
                </div>


            </div>

                {/* 🔁 Mapped feature cards */}
            {cards.map(({ title, img, slug, desc }) => (
                <div key={title} className="cards group relative overflow-hidden">
                    <a href={`/projects/${slug}`} rel="noreferrer" className="block w-full h-full relative">
                        {/* Image: slightly blurred + dim by default, crystal clear on hover */}
                        <img
                            src={img}
                            alt={title}
                            className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-out group-hover:blur-sm"
                        />


                        {/* Overlay content */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <h3 className="text-gray-800 drop-shadow text-3xl font-bold mb-2">{title}</h3>
                            <p className="text-gray-800/90 drop-shadow text-sm max-w-md">{desc}</p>
                        </div>
                    </a>
                </div>
            ))}



        </div>
        </section>
    );
}

export default Cards;