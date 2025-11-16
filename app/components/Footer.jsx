// components/Footer.jsx
'use client';

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-stone-200 bg-white/40 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
                <div className="grid gap-8 md:grid-cols-3 items-start">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <Link href="/" aria-label="Vissza a főoldalra">
                            <Image
                                src="/logo.png"
                                alt="Bognart Interior Design logó"
                                width={160}
                                height={160}
                                className="shrink-0"
                                priority={false}
                            />
                        </Link>
                    </div>

                    {/* Middle: Copyright / IP notice */}
                    <section
                        aria-labelledby="copyright-heading"
                        className="text-xs md:text-sm text-stone-700 leading-relaxed"
                    >
                        <h3
                            id="copyright-heading"
                            className="font-semibold tracking-wide mb-1"
                        >
                            SZERZŐI JOGOK
                        </h3>
                        <small className="block">
                            Az oldalon elérhető tervek, információk és fotók a tervező
                            kizárólagos szellemi tulajdonát képezik. Ezen tartalmak engedély
                            nélküli publikálása, megosztása, másolása vagy bármilyen más módú
                            felhasználása a szerzői jog megsértésének minősül, és a törvény
                            büntetése alá esik.
                        </small>
                    </section>

                    {/* Right: Links */}
                    <nav
                        aria-label="Jogi linkek"
                        className="md:text-right text-stone-700"
                    >
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/policies/privacy"
                                    className="underline text-[#CA8A8A] hover:text-[#AD4949]"
                                >
                                    Adatvédelmi tájékoztató
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/policies/terms"
                                    className="underline text-[#CA8A8A] hover:text-[#AD4949]"
                                >
                                    Szerződési feltételek
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-stone-500">
                    <p aria-label={`Copyright ${year}`}>
                        © {year} BOGNART. Minden jog fenntartva.
                    </p>
                    <p>
                        powered by{" "}
                        <a
                            href="https://lasolutions.hu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-dotted hover:text-stone-700"
                        >
                            LA Solutions
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
