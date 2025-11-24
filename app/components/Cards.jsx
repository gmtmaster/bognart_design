'use client';

import { motion } from "framer-motion";
import { cards } from "@/constants";

export default function Cards() {
    return (
        <section id="referenciak" className="py-24 bg-[#f4f1ec]">
            <div className="max-w-6xl mx-auto px-6">



                {/* --- Intro szöveg --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* BAL OLDAL – Szöveg */}
                        <div>
                            <p className="uppercase text-3xl lg:text-5xl font-semibold mb-4 tracking-wide text-black">
                                REFERENCIÁK
                            </p>

                            <h2 className="text-xl md:text-2xl font-bold leading-tight max-w-3xl text-black">
                                A{" "}
                                <span className="bg-amber-900/60 bg-clip-text text-transparent">
                    Bognart Belsőépítész Stúdióban
                </span>{" "}
                                minden teret az{" "}
                                <span className="bg-amber-900/60 bg-clip-text text-transparent">
                    ügyfeleim életmódjához
                </span>{" "}
                                igazítok — legyen az hálószoba, nappali, konyha vagy fürdőszoba.
                            </h2>

                            <p className="text-lg text-gray-700 mt-4 max-w-3xl">
                                Fontos számomra, hogy a terek egyszerre legyenek szépek, praktikusak és személyesek.
                                Figyelmesen dolgozom a részleteken, hogy együtt megalkossuk az álmaid otthonát,
                                ahol minden nap öröm és kényelem vár.
                            </p>
                        </div>

                        {/* JOBB OLDAL – Kapcsolat kártya */}
                        <div className="flex flex-col lg:h-full">
                            <div className="mt-auto flex justify-end">
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl  max-w-md w-full">
                                    <div className="flex flex-col items-center text-center">
                                        <h3 className="text-xl font-bold">Lépj Velem Kapcsolatba</h3>

                                        <button
                                            onClick={() =>
                                                document
                                                    .querySelector('#kapcsolat')
                                                    ?.scrollIntoView({ behavior: 'smooth' })
                                            }
                                            className="button mt-4"
                                        >
                                            Elérhetőségek
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {cards.map(({ title, img, slug, desc }, i) => (
                        <motion.div
                            key={slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="rounded-2xl overflow-hidden shadow-lg group"
                        >
                            <a href={`/projects/${slug}`} className="block w-full h-full relative">

                                <img
                                    src={img}
                                    alt={title}
                                    className="h-72 w-full object-cover transition duration-300 group-hover:brightness-75"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6">
                                    <h3 className="text-white text-2xl font-bold drop-shadow-md">
                                        {title}
                                    </h3>
                                    <p className="text-white/90 text-sm mt-1 max-w-xs drop-shadow-sm">
                                        {desc}
                                    </p>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
