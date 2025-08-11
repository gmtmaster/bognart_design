'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function RolamSection() {
    const paragraphs = [
        `Bognár Csenge vagyok, a BOGNART Belsőépítész Studio megálmodója. Már egészen fiatalon tudtam, hogy művészet területén szeretnék elhelyezkedni, hogy kreativitásom megoszthassam másokkal is. Így, mikor pályaválasztás előtt álltam, egyértelmű volt számomra, hogy Belsőépítész szakmában szeretnék elhelyezkedni, mivel mindig is fontos volt számomra a pontosság és a precizitás.`,
        `Belsőépítészként segítek egy időtálló, részletekben rejlő harmonikus otthont létrehozni. Fontos számomra, hogy minden projektemnél a design és a funkcionalitás egyet alkosson. Projektjeim során segítek az ügyfeleimnek a döntéshozásban, és biztosítom, hogy minőségi és stílusos teret hozzunk létre együtt. Minden tervezés titka, hogy olyan helyiséget hozzunk létre, amely tükrözi az ügyfelem egyedi személyiségét és igényeit, miközben megőrzöm a funkcionalitás és esztétika harmóniáját.`,
        `Az alkotómunka során inspirációt merítek a környezetből, a természetből, és a különböző kultúrákból, hogy egyedi és izgalmas belső tereket hozzak létre. Hiszem, hogy a környezet, amelyben élünk, jelentősen befolyásolja életmódunkat és hangulatunkat, ezért nagy hangsúlyt fektetek arra, hogy az általam tervezett terek nemcsak szépek legyenek, hanem kellemes életteret is nyújtsanak az embereknek.`,
        `Munkám során együttműködök az ügyfelekkel, hogy megismerjem elképzeléseiket és igényeiket, majd ezek alapján tervezek és alkotok. Fontos számomra, hogy minden projekt egyedi legyen, hiszen minden otthon és minden ügyfél más és más. A kreativitásom és a szakértelmem segítségével olyan teret hozok létre, amely az ügyfeleimnek tökéletesen megfelel.`,
        `Szenvedéllyel és odaadással végzem a munkámat, és büszke vagyok arra, hogy olyan otthonokat hozhatok létre, amelyekben az emberek boldogan élnek. Várom, hogy új kihívásokkal és projektekkel találkozhassak, és segíthessek újabb és újabb terek megtervezésében és megvalósításában.`,
        `Ha Ön is álmodozik egy egyedi, harmonikus és stílusos otthont létrehozni, akkor keressen meg, és együtt dolgozva valóra válthatjuk az elképzeléseit!`,
    ];

    return (
        <section id="rolam" className="py-16 md:py-24 bg-[#f4f1ec]">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
                {/* Left: text card */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-stone-50/90 rounded-2xl shadow-lg p-8 md:p-10 border border-stone-200"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Rólam</h2>
                    <hr className="border-stone-200 mb-6" />

                    <div className="space-y-5 text-stone-800 leading-relaxed text-lg">
                        {paragraphs.map((t, i) => (
                            <motion.p key={i} variants={item}>
                                {t}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div variants={item} className="mt-8">
                        <button className="button">
                            Kapcsolat
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right: images */}
                <div className="flex flex-col gap-4">
                    {/* Big image */}
                    <div className="relative h-[100vh] sm:h-96 md:h-[100vh] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/csenge.jpg"
                            alt="Belsőépítészeti hangulatkép"
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(min-width: 768px) 50vw, 100vw"
                        />
                        {/* optional subtle overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-stone-100/20 to-transparent" />
                    </div>

                    {/* Signature image (same width, less height) */}
                    <div className="relative h-24 sm:h-28 md:h-32 rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-50/30">
                        <Image
                            src="/signature.png"          // put your signature image in /public
                            alt="Aláírás"
                            fill
                            className="object-contain object-left md:object-center"
                            sizes="(min-width: 768px) 50vw, 100vw"
                            priority={false}
                        />
                    </div>
                </div>


            </div>
        </section>
    );
}

export function AboutMe() {}