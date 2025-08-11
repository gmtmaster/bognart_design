'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTAINER = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const ITEM = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function FAQ() {
    return (
        <section id="gyik" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Gyakori kérdések</h2>
                    <p className="mt-3 text-stone-600">
                        Összegyűjtöttük a leggyakrabban felmerülő kérdéseket. Ha nem találja a választ, írjon nekünk bátran.
                    </p>

                    <motion.ul
                        variants={CONTAINER}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-8 space-y-3"
                    >
                        <FAQItem title="Milyen árakon érhetők el szolgáltatásaink?">
                            <p className="mb-3">
                                Mivel minden ingatlan egyedi, weboldalunkon nincs fix árlista. Minden megbízás személyre szabott, a
                                tervezési díj több tényezőtől függ. Ezért minden érdeklődőnek egyéni árajánlatot készítünk, amit
                                általában 1–2 munkanapon belül küldünk.
                            </p>
                            <p className="mb-3">
                                A pontos ár meghatározásához kérjük, használja az <a href="/#arajanlat" className="text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800">Árajánlatkérés</a> menüpontot.
                                Itt lépésről lépésre adhatja meg a szükséges adatokat, így a folyamat gyors és gördülékeny. Az
                                ajánlatkérés semmilyen kötelezettséggel nem jár.
                            </p>
                            <p>
                                Szívesen segítünk az ingatlan tervezésében, és örömmel válaszolunk minden felmerülő kérdésre.
                            </p>
                        </FAQItem>

                        <FAQItem title="Mennyi időt vesz igénybe a tervek elkészítése?">
                            <p className="mb-3">A tervezési időt több tényező együttesen befolyásolja:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Tervezési terület nagysága – nagyobb terület = több részlet, hosszabb folyamat.</li>
                                <li>Projekt bonyolultsága – összetettebb koncepciók részletesebb kidolgozást igényelnek.</li>
                                <li>Választott tervezési csomag – magasabb szint részletesebb dokumentációt jelent.</li>
                                <li>Aktuális kapacitás – futó projektek ütemezése.</li>
                                <li>Ügyfél által megadott határidő – igény szerint rugalmasan igazítjuk az ütemezést.</li>
                            </ul>
                            <p className="mt-3">Ezek alapján projekt-specifikus időtartammal számolunk.</p>
                        </FAQItem>

                        <FAQItem title="Mikor érdemes belsőépítészt bevonni?">
                            <p className="mb-3">
                                Új építésű ingatlan esetén már az alaprajz elkészülte után érdemes bevonni a belsőépítészt. Így az
                                építésszel együttműködve a falazási tervek is finomíthatók, és élhetőbbé tehető az eredeti koncepció.
                            </p>
                            <p className="mb-3">
                                Meglévő ingatlan vásárlásakor, még a munkálatok megkezdése előtt javasolt felkeresni bennünket. A
                                korai bevonás gördülékenyebb tervezést és kivitelezést eredményez, elkerülve későbbi plusz költségeket.
                            </p>
                            <p>
                                Az időben elkészült tervek pontosabb anyag- és berendezésválasztást tesznek lehetővé, és segítenek a
                                funkció és esztétika összehangolásában.
                            </p>
                        </FAQItem>

                        <FAQItem title="Hogyan zajlik a tervezési folyamat?">
                            <p className="mb-3">
                                Az árajánlat elfogadása és a szerződés után egyeztetett személyes találkozón részletesen átbeszéljük a
                                projektet. Érdemes inspirációs képeket is hozni (pl. Pinterest), hogy pontosan lássuk az ízlést és
                                igényeket.
                            </p>
                            <p className="mb-3">
                                Ezt követi az aktív tervezési szakasz, több alternatíva kidolgozásával. Célunk a közös gondolkodás,
                                hogy a végeredmény teljes mértékben tükrözze elképzeléseit.
                            </p>
                            <p>
                                Fontos számunkra, hogy a folyamat inspiráló és együttműködő legyen – egyedi, az Ön stílusához illő
                                térrel a végén.
                            </p>
                        </FAQItem>

                        <FAQItem title="Egy helyiség megtervezése is elérhető, vagy csak teljes ingatlanra dolgoznak?">
                            <p className="mb-3">
                                Természetesen egyetlen helyiség tervezését is vállaljuk – ugyanazzal a precizitással és odafigyeléssel,
                                mint teljes ingatlan esetén.
                            </p>
                            <p>
                                Kisebb területeknél is alaposan feltérképezzük az igényeket és a stílust, hogy a végeredmény
                                tökéletesen illeszkedjen az elvárásokhoz. A folyamatos kommunikáció itt is kulcsfontosságú.
                            </p>
                        </FAQItem>
                    </motion.ul>
                </div>
            </div>
        </section>
    );
}

function FAQItem({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.li variants={ITEM} className="rounded-xl border border-stone-200 bg-stone-50/90 p-4 md:p-5">
            <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                aria-controls={slugify(title)}
            >
                <span className="text-base md:text-lg font-semibold text-stone-900">{title}</span>
                <Chevron open={open} />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={slugify(title)}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 text-stone-700 leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    );
}

function Chevron({ open }) {
    return (
        <motion.svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-stone-700"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
        >
            <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </motion.svg>
    );
}

function slugify(s = '') {
    return s
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
