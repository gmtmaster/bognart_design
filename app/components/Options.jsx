'use client';

import { motion } from 'framer-motion';
import Slider from './Slider';
import { pics, pics1 } from "@/constants";

const sectionVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, when: 'beforeChildren' } }
};

const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const gridVariants = {
    hidden: {},
    show: { transition: { delayChildren: 0.2, staggerChildren: 0.2 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
};

const textBlockVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const bannerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

export default function Options() {
    return (
        <motion.section
            id="latvanytervek"
            aria-labelledby="latvanytervek-cim"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-[#f4f1ec] min-h-screen py-6"
        >
            <div className="bg-white/70 backdrop-blur-2xl rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
                <motion.div
                    className="flex justify-center mb-10 items-center mx-auto text-center bg-white/70 rounded-2xl max-w-2xl shadow-md py-2 border-2 border-[rgba(120,53,15,0.3)]"
                    variants={titleVariants}
                >
                    {/* H2: szekciócím */}
                    <h2 id="latvanytervek-cim" className="text-xl md:text-3xl font-bold text-black">
                        Fedezd fel a látványtervek közötti különbséget
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-4"
                    variants={gridVariants}
                >
                    {/* Bal oszlop */}
                    <motion.figure
                        className="flex flex-col items-center p-4"
                        variants={cardVariants}
                        role="region"
                        aria-label="Egyszerűsített látványterv galéria"
                        aria-live="off"
                    >
                        <motion.div
                            className="w-full transition-transform duration-300 hover:scale-[1.01]"
                            whileHover={{ y: -2 }}
                        >
                            <Slider
                                images={pics}
                                aspect="aspect-[4/3]"
                                interval={4000}
                                className="shadow-xl rounded-2xl"
                            />
                        </motion.div>
                        <motion.figcaption
                            className="mt-4 max-w-sm w-full text-center bg-white/30 rounded-2xl p-3 shadow-md backdrop-blur"
                            variants={textBlockVariants}
                        >
                            <p className="font-medium text-gray-800">Egyszerűsített látványterv</p>
                        </motion.figcaption>
                    </motion.figure>

                    {/* Jobb oszlop */}
                    <motion.figure
                        className="flex flex-col items-center p-4"
                        variants={cardVariants}
                        role="region"
                        aria-label="Fotórealisztikus látványterv galéria"
                        aria-live="off"
                    >
                        <motion.div
                            className="w-full transition-transform duration-300 hover:scale-[1.01]"
                            whileHover={{ y: -2 }}
                        >
                            <Slider
                                images={pics1}
                                aspect="aspect-[4/3]"
                                interval={4000}
                                className="shadow-xl rounded-2xl"
                            />
                        </motion.div>
                        <motion.figcaption
                            className="mt-4 max-w-sm w-full text-center bg-white/30 rounded-2xl p-3 shadow-md backdrop-blur"
                            variants={textBlockVariants}
                        >
                            <p className="font-medium text-gray-800">Fotórealisztikus látványterv</p>
                        </motion.figcaption>
                    </motion.figure>
                </motion.div>

                <motion.div
                    className="flex justify-center mb-10 items-center mx-auto text-center"
                    variants={textBlockVariants}
                >
                    <h3 className="mt-[30px] text-lg md:text-xl max-w-4xl text-black">
                        Nincs két ugyanolyan projekt, így nincs két azonos árképzés sem. A tervezési költség
                        meghatározása számos tényezőtől függ, például a projektek jellegétől, méretétől,
                        komplexitásától, az igényelt munka mennyiségétől és az időtartalmától.
                    </h3>
                </motion.div>

                <motion.aside
                    className="flex justify-center mb-10 items-center mx-auto text-center bg-[#AD4949]/80 border border-white/60 shadow-lg rounded-2xl max-w-5xl py-2"
                    variants={bannerVariants}
                    whileHover={{ scale: 1.01 }}
                    aria-label="Árinformációs megjegyzés"
                >
                    <h3 className="text-lg md:text-2xl max-w-4xl text-white">
                        <span className="uppercase font-bold">Fontos!</span> <br />
                        Az árak a kiszállítási díjat, valamint a helyszín felmérésének díját nem tartalmazzák.
                        Az árak nettó árak és egy tervezési négyzetméterre vonatkoznak.
                    </h3>
                </motion.aside>
            </div>
        </motion.section>
    );
}
