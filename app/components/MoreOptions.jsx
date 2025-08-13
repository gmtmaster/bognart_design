'use client';

import { useState } from 'react';
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
        <section className="bg-[#f4f1ec] py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-4">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl flex justify-center rounded-2xl mb-14 font-bold max-w-lg shadow-md py-2 mx-auto bg-white/70 border-2 border-[rgba(120,53,15,0.3)]">
                        Plusz szolgáltatások és opciók
                    </h2>

                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white/70 backdrop-blur shadow-xl ring-1 ring-black/5 px-6 sm:px-8 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                        {/* Left: image / visual */}
                        <div className="order-2 md:order-1">
                            <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="w-full object-cover"
                                />
                            </div>

                        </div>

                        {/* Right: accordion */}
                        <div className="order-1 md:order-2">
                            <motion.ul
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.15 }}
                                className="space-y-3"
                            >
                                {plusOptions
                                    .filter(it => it?.title?.trim())
                                    .map((it, i) => (
                                        <AccordionItem
                                            key={`${it.title}-${i}`}
                                            title={it.title}
                                            desc={it.desc}
                                            priceOnline={it.priceOnline}
                                            priceInPerson={it.priceInPerson}
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

function AccordionItem({ title, desc, priceOnline, priceInPerson }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.li
            variants={itemVariants}
            className="rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors"
        >
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                aria-controls={slugify(title)}
                className="w-full px-4 py-3 md:py-4 flex items-center gap-3 justify-between text-left"
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                        <span className="truncate text-base md:text-lg font-semibold text-stone-900">
                          {title}
                        </span>
                    </div>
                </div>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                    className="shrink-0 text-stone-700"
                    aria-hidden="true"
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={slugify(title)}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 md:pb-5 text-sm md:text-base leading-relaxed text-stone-700">
                            <p>{desc}</p>
                        </div>
                        <div className="px-4 pb-4 md:pb-5 text-sm md:text-base leading-relaxed text-stone-700">
                            <p>{priceOnline}</p>
                            <p>{priceInPerson}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    );
}

// safer slug
function slugify(s = 'item') {
    return String(s)
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
