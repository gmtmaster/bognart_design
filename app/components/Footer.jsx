// components/Footer.jsx
'use client';
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className=" border-t border-stone-200 bg-white/40 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
                <div className="grid gap-8 md:grid-cols-3 items-start">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.png" // change if needed
                            alt="BOGNART"
                            width={300}
                            height={300}
                            className="shrink-0"
                        />

                    </div>

                    {/* Middle: Copyright / IP notice */}
                    <div className="text-sm text-stone-700 leading-relaxed">
                        <h3 className="font-semibold tracking-wide mb-1">SZERZŐI JOGOK</h3>
                        <p>
                            Az oldalon elérhető tervek, információk és fotók a tervező kizárólagos szellemi
                            tulajdonát képezik. Ezen tartalmak engedély nélküli publikálása, megosztása,
                            másolása vagy bármilyen más módú felhasználása a szerzői jog megsértésének minősül,
                            és a törvény büntetése alá esik.
                        </p>
                    </div>

                    {/* Right: Links */}
                    <div className="md:text-right text-stone-700">
                        <ul className="space-y-2">
                            <li>
                                <Link href="/policies/privacy" className="underline text-[#CA8A8A] hover:text-[#AD4949]">
                                    Adatvédelmi tájékoztató
                                </Link>
                            </li>
                            <li>
                                <Link href="/policies/terms" className="underline text-[#CA8A8A] hover:text-[#AD4949]">
                                    Szerződési feltételek
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-stone-500">
                    <p>© {year} BOGNART. Minden jog fenntartva.</p>
                    <p>
                        Designed by{" "}
                        <a
                            href="https://adamlekrinszki.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-dotted hover:text-stone-700"
                        >
                            Adam Lekrinszki
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
