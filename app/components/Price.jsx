import React from 'react';
import {motion} from "framer-motion";
import {FiX} from "react-icons/fi";
import Link from "next/link";

function Price(props) {
    return (
        <section>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 30 }}
                    transition={{ type: "spring", damping: 30, stiffness: 200, duration: 0.8 }}
                    className="w-full max-w-lg rounded-xl border border-stone-200 bg-stone-50 p-6 shadow-xl max-h-[85vh] overflow-y-auto overscroll-contain"
                >
                    {/* sticky header (optional but nice) */}
                    <div className="mb-4 flex items-center justify-between bg-stone-50 pb-3 pt-1 -mt-1">
                        <h1 className="text-2xl font-bold text-stone-800">Lépj velem kapcsolatba</h1>
                        <button onClick={closeContactForm}>
                            <FiX className="h-6 w-6 text-stone-400" />
                        </button>
                    </div>

                    {/* Form */}
                    <form action="" className="space-y-4">
                        {/* Név */}
                        <div>
                            <label htmlFor="name" className="mb-1 block text-sm font-medium text-stone-700">
                                Név
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Írd be a neved"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium text-stone-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="nev@email.hu"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Telefon */}
                        <div>
                            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-stone-700">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="+36 …"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Ingatlan elhelyezkedése */}
                        <div>
                            <label htmlFor="location" className="mb-1 block text-sm font-medium text-stone-700">
                                Ingatlan elhelyezkedése
                            </label>
                            <input
                                type="text"
                                id="location"
                                placeholder="Város, kerület / cím"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Ingatlan mérete */}
                        <div>
                            <label htmlFor="size" className="mb-1 block text-sm font-medium text-stone-700">
                                Ingatlan mérete
                            </label>
                            <input
                                type="text"
                                id="size"
                                placeholder="pl. 65 m²"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Ingatlan állapota */}
                        <div>
                            <label htmlFor="condition" className="mb-1 block text-sm font-medium text-stone-700">
                                Ingatlan állapota
                            </label>
                            <select
                                id="condition"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="">Válassz…</option>
                                <option>Új építésű</option>
                                <option>Jó állapotú</option>
                                <option>Felújítandó</option>
                                <option>Egyéb</option>
                            </select>
                        </div>

                        {/* Választott tervezési csomag */}
                        <div>
                            <label htmlFor="package" className="mb-1 block text-sm font-medium text-stone-700">
                                Választott tervezési csomag
                            </label>
                            <select
                                id="package"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="">Válassz…</option>
                                <option>Konzultáció</option>
                                <option>Alap csomag</option>
                                <option>Prémium csomag</option>
                                <option>Luxus csomag</option>
                            </select>
                        </div>

                        {/* Checkboxok */}
                        <div className="flex flex-wrap gap-6">
                            <label className="inline-flex items-center gap-2 text-stone-700">
                                <input type="checkbox" className="h-4 w-4 accent-amber-600" />
                                Tanácsadás
                            </label>
                            <label className="inline-flex items-center gap-2 text-stone-700">
                                <input type="checkbox" className="h-4 w-4 accent-amber-600" />
                                Árajánlatkérés
                            </label>
                        </div>

                        {/* Hol hallott rólunk */}
                        <div>
                            <label htmlFor="ref" className="mb-1 block text-sm font-medium text-stone-700">
                                Hol hallott a BOGNARTról?
                            </label>
                            <select
                                id="ref"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="">Válassz…</option>
                                <option>Google</option>
                                <option>Instagram / Facebook</option>
                                <option>Ismerős ajánlotta</option>
                                <option>Egyéb</option>
                            </select>
                        </div>

                        {/* Üzenet */}
                        <div>
                            <label htmlFor="message" className="mb-1 block text-sm font-medium text-stone-700">
                                Üzenet
                            </label>
                            <textarea
                                rows={4}
                                id="message"
                                placeholder="Miben segíthetünk?"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>


                        {/* Consent */}
                        <div className="rounded-lg border border-stone-200 bg-stone-100/70 p-4">
                            <label htmlFor="consent" className="flex items-start gap-3 text-sm text-stone-700">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    required
                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-amber-600 focus:ring-amber-500 focus:outline-none"
                                />
                                <span>
                                            Elolvastam és elfogadom a{' '}
                                    <Link
                                        href="/terms"
                                        className="font-medium text-amber-700 underline  hover:text-amber-800"
                                    >
                                            Felhasználási feltételeket
                                          </Link>{' '}
                                    és az{' '}
                                    <Link
                                        href="/privacy"
                                        className="font-medium text-amber-700 underline  hover:text-amber-800"
                                    >
                                            Adatvédelmi tájékoztatót
                                          </Link>
                                          .
                                        </span>
                            </label>
                            <p className="mt-2 text-xs text-stone-500">
                                Az űrlap beküldésével hozzájárulsz az adataid kezeléséhez az adatkezelési tájékoztató szerint.
                            </p>
                        </div>



                        {/* Gomb */}
                        <div className="flex justify-center">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={openContactForm}
                                className="button">
                                Küldés
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Price;