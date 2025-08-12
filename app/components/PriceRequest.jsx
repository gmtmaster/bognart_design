'use client'

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import BlueprintUploader from "@/app/components/BluePrintUploader";

function PriceRequest() {
    return (
        <section className="min-h-screen py-28 px-4 flex justify-center items-start ">
            <div className="w-full max-w-lg rounded-xl border border-stone-200 bg-white shadow-xl flex flex-col ">
                {/* Sticky header */}
                <div className="px-6 py-4 bg-white rounded-2xl z-10">
                    <h1 className="text-2xl font-bold text-stone-800">Árajánlat kérés</h1>
                </div>

                {/* Scrollable form content */}
                <div className="overflow-y-auto px-6 py-4 space-y-4">
                    <form className="space-y-4">
                        {/* Név */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                                Név
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Írd be a neved"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="nev@email.hu"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
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
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
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
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
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
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
                            />
                        </div>

                        {/* Ingatlan állapota */}
                        <div>
                            <label htmlFor="condition" className="mb-1 block text-sm font-medium text-stone-700">
                                Ingatlan állapota
                            </label>
                            <select
                                id="condition"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
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
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
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
                                <input type="checkbox" className="h-4 w-4 accent-[#CA8A8A]" />
                                Tanácsadás
                            </label>
                            <label className="inline-flex items-center gap-2 text-stone-700">
                                <input type="checkbox" className="h-4 w-4 accent-[#CA8A8A]" />
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
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
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
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
                            />
                        </div>

                        {/* Alaprajz feltöltés (opcionális) */}
                        <BlueprintUploader maxFiles={3} onChange={(files) => console.log('selected files:', files)} />



                        {/* Consent */}
                        <div className="rounded-lg border border-stone-200 bg-stone-100/70 p-4">
                            <label htmlFor="consent" className="flex items-start gap-3 text-sm text-stone-700">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    required
                                    className="mt-0.5 h-4 w-4"
                                />
                                <span>
                                  Elolvastam és elfogadom a{' '}
                                                    <Link href="/policies/terms" className="font-medium text-[#CA8A8A] hover:text-[#AD4949] underline">
                                    Felhasználási feltételeket
                                  </Link>{' '}
                                                    és az{' '}
                                                    <Link href="/policies/privacy" className="font-medium text-[#CA8A8A] hover:text-[#AD4949] underline">
                                    Adatvédelmi tájékoztatót
                                  </Link>.
                                </span>
                            </label>
                            <p className="mt-2 text-xs text-stone-500">
                                Az űrlap beküldésével hozzájárulsz az adataid kezeléséhez.
                            </p>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-center">
                            <button type="submit" className="button">
                                Küldés
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default PriceRequest;