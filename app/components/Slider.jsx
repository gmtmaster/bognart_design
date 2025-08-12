'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function Slider({
                                   images = [],
                                   interval = 3000,
                                   autoPlay = true,
                                   className = '',
                                   aspect = 'aspect-[4/3]', // change to 'aspect-video' etc.
                               }) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);
    const hoveringRef = useRef(false);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);

    // autoplay
    useEffect(() => {
        if (!autoPlay || images.length <= 1) return;
        const start = () => {
            clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                if (!hoveringRef.current) {
                    setIndex((i) => (i + 1) % images.length);
                }
            }, interval);
        };
        start();
        return () => clearInterval(timerRef.current);
    }, [images.length, interval, autoPlay]);

    const goTo = (i) => setIndex((i + images.length) % images.length);
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    // keyboard nav
    const containerRef = useRef(null);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onKey = (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        el.addEventListener('keydown', onKey);
        return () => el.removeEventListener('keydown', onKey);
    }, [index]);

    // swipe
    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const onTouchMove = (e) => {
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };
    const onTouchEnd = () => {
        const dx = touchDeltaX.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        touchStartX.current = 0;
        touchDeltaX.current = 0;
    };

    if (!images?.length) return null;

    return (
        <section
            ref={containerRef}
            tabIndex={0}
            className={`relative select-none ${className}`}
            aria-roledescription="carousel"
            aria-label="Image slider"
            onMouseEnter={() => (hoveringRef.current = true)}
            onMouseLeave={() => (hoveringRef.current = false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Stage */}
            <div className={`w-full ${aspect} overflow-hidden rounded-2xl`}>
                <div className="relative h-full w-full">
                    {images.map((src, i) => (
                        <figure
                            key={src + i}
                            className={`
                absolute inset-0 transition-opacity duration-500 ease-out
                ${i === index ? 'opacity-100' : 'opacity-0'}
              `}
                            aria-hidden={i !== index}
                        >
                            <img
                                src={src}
                                alt=""
                                className="h-full w-full object-cover"
                                draggable="false"
                            />
                        </figure>
                    ))}


                </div>
            </div>


        </section>
    );
}
