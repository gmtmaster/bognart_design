'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTAINER = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const ITEM = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function FAQ() {
    return (
        <section id="gyik" className="py-12 md:py-24">
            <div className="mx-auto max-w-2xl md:max-w-3xl px-4 overflow-visible">
                <h2 className="text-2xl md:text-4xl font-bold text-stone-900">
                    Gyakori kérdések
                </h2>
                <p className="mt-2 md:mt-3 text-stone-600 text-sm md:text-base">
                    Összegyűjtöttük a leggyakrabban felmerülő kérdéseket. Ha nem találja a választ, írjon nekünk bátran.
                </p>

                <motion.ul
                    variants={CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.12 }}
                    className="mt-6 md:mt-8 space-y-2.5 md:space-y-3 overflow-visible"
                >
                    <FAQItem title="Milyen árakon érhetők el szolgáltatásaink?">
                        <p className="mb-3">
                            Mivel minden ingatlan egyedi, weboldalunkon nincs fix árlista. Minden megbízás személyre szabott, a
                            tervezési díj több tényezőtől függ. Ezért minden érdeklődőnek egyéni árajánlatot készítünk, amit
                            általában 1–2 munkanapon belül küldünk.
                        </p>
                        <p className="mb-3">
                            A pontos ár meghatározásához kérjük, használja az{" "}
                            <a
                                href="/#arajanlat"
                                className="text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800"
                            >
                                Árajánlatkérés
                            </a>{" "}
                            menüpontot. Itt lépésről lépésre adhatja meg a szükséges adatokat, így a folyamat gyors és gördülékeny. Az
                            ajánlatkérés semmilyen kötelezettséggel nem jár.
                        </p>
                        <p>Szívesen segítünk az ingatlan tervezésében, és örömmel válaszolunk minden felmerülő kérdésre.</p>
                    </FAQItem>

                    <FAQItem title="Mennyi időt vesz igénybe a tervek elkészítése?">
                        <p className="mb-2">A tervezési időt több tényező együttesen befolyásolja:</p>
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

                    <FAQItem title="Hogyan zajlik a tervezés?">
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

                    <FAQItem title="Tervezési folyamat">
                        <p className="mb-3">
                            <span className="font-bold">01. Kapcsolatfelvétel az ügyféllel</span> – Az első lépés a megfelelő szolgáltatási csomag kiválasztása
                            vagy egyedi árajánlat kérése. Ezt követően 48 órán belül felveszem Önnel a kapcsolatot emailben
                            vagy telefonon, hogy egy rövid beszélgetés keretében pontosítsuk a tervezési igényeket.
                            Bemutatom a csomagok tartalmát és a szolgáltatási díjak várható nagyságrendjét.
                            Amennyiben ajánlatom megfelel, egyeztetjük a további lépéseket és az első személyes konzultáció időpontját.
                        </p>

                        <p className="mb-3">
                            <span className="font-bold">02. Első személyes konzultáció</span> – A személyes találkozót előre egyeztetett időpontban, akár a
                            tervezendő helyszínen tartjuk. Itt részletesen átbeszéljük elképzeléseit, igényeit, valamint
                            tisztázzuk a tervezési folyamat menetét és az ütemtervet. Megosztjuk egymással az inspirációs anyagokat,
                            és áttekintjük a konzultáció előtt kitöltött kérdőív válaszait. A kérdőívet legkésőbb a találkozó előtti napig szükséges visszaküldeni.
                        </p>

                        <p className="mb-3">
                            <span className="font-bold">03. Tervezési folyamat és költségvetés</span> – Az első konzultáció után részletesen áttekintjük a
                            költségvetést és a választott tervezési csomag tartalmát. Kiküldésre kerül a szerződés, melynek
                            aláírását követően megkezdődik a tervezési munka az egyeztetett ütemterv szerint.
                        </p>

                        <p className="mb-3">
                            <span className="font-bold">04. Tervezési folyamat kezdete</span> – A szerződés aláírása után megkezdjük az első tervdokumentáció
                            elkészítését, amely egy vázlatos, koncepcionális anyag. Ebből az anyagból Ön könnyen kiválaszthatja
                            a számára legmegfelelőbb irányt.
                        </p>

                        <p className="mb-3">
                            <span className="font-bold">05. Második személyes konzultáció</span> – A találkozón bemutatjuk az első tervdokumentációt, amely több
                            berendezési és kialakítási opciót tartalmaz a felmérések és igények alapján. Bemutatásra kerülnek
                            a vázlatos konszignációs alaprajzok, falnézetek, valamint az első 3D látványtervek.
                            Ezen a ponton kerül sor a burkolatok, bútorok, szaniterek és egyéb design elemek kiválasztására.
                            Igény esetén vállaljuk a beszerzés és rendelés lebonyolítását is. A tervezési folyamat alatt
                            folyamatosan kapcsolatban állunk Önnel.
                        </p>

                        <p className="mb-3">
                            <span className="font-bold">06. Második tervezési szakasz</span> – A második konzultáció során egyeztetett módosításokat elvégezzük,
                            véglegesítjük a konszignációs alaprajzokat és elkészítjük a részletes 3D látványterveket.
                            Elkészülnek a csomagban foglalt további műszaki és kivitelezési tervek is (pl. falnézetek,
                            elektromos, világítási, bontási és falazási tervek).
                        </p>

                        <p className="mb-3">
                            <span className="font-bold">07. Harmadik személyes konzultáció</span> – A harmadik találkozón bemutatjuk a majdnem végleges
                            tervdokumentációt, ahol átbeszéljük az utolsó módosítási igényeket. Ezt követően elkészítjük
                            a kivitelezéshez szükséges végleges terveket. Ha szükséges, további konzultációkat is biztosítunk,
                            amelyek igény szerint külön szolgáltatásként rendelhetők meg.
                        </p>

                        <p className="mb-3">
                            <span className="font-bold">08. Végleges tervdokumentáció átadása</span> – Az ütemtervnek megfelelően a tervezési folyamat végéhez érünk,
                            és a kivitelezési terveket elektronikus formában átadjuk. Igény esetén személyes konzultáció keretében is
                            átbeszéljük a dokumentációt. A végleges tervcsomag minden olyan tervet tartalmaz, amely a sikeres
                            kivitelezéshez szükséges.
                        </p>

                        <p>
                            <span className="font-bold">09. Kivitelezés támogatása</span> – Minden csomag kiválasztása előtt egyeztetünk, hogy igényli-e a kivitelezés
                            alatti támogatást. Amennyiben ezt kéri, folyamatos kapcsolatot tartunk a kivitelező szakemberekkel,
                            felügyeljük a munkálatok előrehaladását, és biztosítjuk, hogy minden a terv szerint valósuljon meg.
                            Ez a szolgáltatás időt és stresszt takarít meg Önnek, valamint díjazása kiszállási díj formájában történik.
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
        </section>
    );
}

function FAQItem({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.li
            variants={ITEM}
            className="rounded-lg md:rounded-xl border border-stone-200 bg-stone-50/90 p-3 md:p-5"
        >
            <button
                type="button"
                className="flex w-full items-center justify-between gap-3 md:gap-4 text-left py-1.5"
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                aria-controls={slugify(title)}
            >
        <span className="text-base md:text-lg font-semibold text-stone-900 leading-snug">
          {title}
        </span>
                <Chevron open={open} />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={slugify(title)}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-visible"
                    >
                        <div className="mt-2 md:mt-3 text-stone-700 text-sm md:text-base leading-relaxed md:leading-[1.8] pr-0.5">
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
            width="22"
            height="22"
            className="shrink-0 text-stone-700"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.18 }}
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
