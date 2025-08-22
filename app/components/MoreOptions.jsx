'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { plusOptions } from '@/constants';

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function MoreOptions() {
    return (
        <section
            id="plusz-opciok"
            aria-labelledby="plusz-opciok-cim"
            className="bg-[#f4f1ec] py-16 md:py-24"
        >
            <div className="mx-auto max-w-6xl px-4">
                {/* Cím */}
                <div className="text-center mb-10 md:mb-14">
                    <h2
                        id="plusz-opciok-cim"
                        className="text-3xl md:text-4xl flex justify-center rounded-2xl mb-14 font-bold max-w-lg shadow-md py-2 mx-auto bg-white/70 border-2 border-[rgba(120,53,15,0.3)]"
                    >
                        Plusz szolgáltatások és opciók
                    </h2>
                </div>

                {/* Kártya */}
                <div className="rounded-2xl bg-white/70 backdrop-blur shadow-xl ring-1 ring-black/5 px-6 sm:px-8 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                        {/* Bal: vizuál */}
                        <figure aria-label="Következő lépések illusztrációja" className="order-2 md:order-1">
                            <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 w-full h-64 md:h-80">
                                <Image
                                    src="/next_steps.jpg"
                                    alt="Következő lépések – szolgáltatási opciók"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    priority={false}
                                />
                            </div>
                            <figcaption className="sr-only">Vizuális illusztráció</figcaption>
                        </figure>

                        {/* Jobb: harmonika */}
                        <div className="order-1 md:order-2">
                            <motion.ul
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.15 }}
                                className="space-y-3"
                                role="list"
                            >
                                {plusOptions
                                    .filter((it) => it?.title?.trim())
                                    .map((it, i) => (
                                        <AccordionItem
                                            key={`${it.title}-${i}`}
                                            index={i}
                                            title={it.title}
                                            desc={it.desc}
                                            priceOnline={it.priceOnline}
                                            priceInPerson={it.priceInPerson}
                                            priceDefault={it.priceDefault}
                                        />
                                    ))}
                            </motion.ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AccordionItem({ index, title, desc, priceOnline, priceInPerson, priceDefault }) {
    const [open, setOpen] = useState(false);
    const uid = useId(); // stabil, egyedi azonosító az ARIA-hoz
    const panelId = `accordion-panel-${index}-${uid}`;
    const buttonId = `accordion-button-${index}-${uid}`;

    return (
        <motion.li variants={itemVariants} className="rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors">
            <div className="px-1">
                {/* Heading + button (WAI-ARIA minta) */}
                <h3 className="sr-only" id={`heading-${index}-${uid}`}>
                    {title}
                </h3>
                <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="w-full px-4 py-3 md:py-4 flex items-center gap-3 justify-between text-left"
                >
                    <span className="truncate text-base md:text-lg font-semibold text-stone-900">{title}</span>
                    <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.18 }}
                        className="shrink-0 text-stone-700"
                        aria-hidden="true"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.span>
                </button>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 md:pb-5 text-sm md:text-base leading-relaxed text-stone-700">
                            {desc && <p className="mb-2">{desc}</p>}
                            {(priceOnline || priceInPerson || priceDefault) && (
                                <dl className="mt-3 space-y-1">
                                    {priceOnline && (
                                        <div className="flex gap-2">
                                            <dt className="font-medium">Online:</dt>
                                            <dd>{priceOnline}</dd>
                                        </div>
                                    )}
                                    {priceInPerson && (
                                        <div className="flex gap-2">
                                            <dt className="font-medium">Személyes:</dt>
                                            <dd>{priceInPerson}</dd>
                                        </div>
                                    )}
                                    {priceDefault && (
                                        <div className="flex gap-2">
                                            <dd>{priceDefault}</dd>
                                        </div>
                                    )}
                                </dl>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    );
}
