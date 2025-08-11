'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slide = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }),
};

export default function ProjectGalleryClient({ images = [], title = '' }) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(0);

    const openAt = (i) => { setIndex(i); setDir(0); setOpen(true); };
    const close = () => setOpen(false);

    const next = () => { setDir(1); setIndex((i) => (i + 1) % images.length); };
    const prev = () => { setDir(-1); setIndex((i) => (i - 1 + images.length) % images.length); };

    // lock background scroll + keyboard controls
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <>
            {/* Thumbnails */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {images.map((src, i) => (
                    <motion.div
                        key={src}
                        whileHover={{ scale: 1.03 }}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-lg cursor-zoom-in"
                        onClick={() => openAt(i)}
                    >
                        <Image
                            src={src}
                            alt={`${title} kép ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                            priority={i < 2}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={close} // click backdrop to close
                    >
                        {/* Stop clicks inside from closing */}
                        <div className="relative w-full max-w-5xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
                            {/* Close */}
                            <button
                                onClick={close}
                                aria-label="Bezárás"
                                className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                            >
                                <FiX className="h-6 w-6" />
                            </button>

                            {/* Prev/Next */}
                            <button
                                onClick={prev}
                                aria-label="Előző"
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                            >
                                <FiChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={next}
                                aria-label="Következő"
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                            >
                                <FiChevronRight className="h-6 w-6" />
                            </button>

                            {/* Slide */}
                            <div className="relative h-full">
                                <AnimatePresence custom={dir} mode="popLayout">
                                    <motion.div
                                        key={images[index]}
                                        custom={dir}
                                        variants={slide}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={images[index]}
                                            alt={`${title} kép ${index + 1}`}
                                            fill
                                            className="object-contain"
                                            sizes="100vw"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Counter */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/80">
                                {index + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
