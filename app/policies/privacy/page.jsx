// app/privacy/page.jsx
"use client";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-stone-800">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">Adatvédelmi tájékoztató</h1>
                <p className="mt-2 text-sm text-stone-500">Hatályos: 2025. augusztus 12.</p>
            </header>

            <section className="space-y-8">
                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">1. Adatkezelő adatai</h2>
                    <ul className="space-y-1 text-sm leading-relaxed">
                        <li><span className="font-medium">Adatkezelő neve:</span> Bognart Interior Design</li>
                        <li><span className="font-medium">Székhely:</span> 6200 Kiskőrös, Petőfi Sándor út 101. [cím]</li>
                        <li><span className="font-medium">E-mail:</span> info@bognart.com</li>
                        <li><span className="font-medium">Weboldal:</span> bognart.com</li>
                        <li><span className="font-medium">Hosting:</span> Domain: Dynadot.com, hosztolás: Vercel.</li>
                        <li><span className="font-medium">Adatbázis:</span> Supabase (csak a szükséges adatokat tároljuk).</li>
                    </ul>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">2. Kezelt adatok köre</h2>
                    <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                        <li>Név</li>
                        <li>E-mail cím</li>
                        <li>Telefonszám</li>
                        <li>Ingatlan adatai (helyszín, méret, állapot)</li>
                        <li>Üzenet és opcionálisan feltöltött fájlok (pl. alaprajzok)</li>
                    </ul>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">3. Az adatkezelés célja és jogalapja</h2>
                    <p className="text-sm leading-relaxed">
                        Az adatok kezelése az árajánlatkérések feldolgozására és kapcsolatfelvételre történik.
                        Jogalap: GDPR 6. cikk (1) bekezdés b) – szerződéskötést megelőző lépések, illetve (1) bekezdés a) – hozzájárulás,
                        ha opcionális fájlokat töltesz fel.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">4. Adattárolás és biztonság</h2>
                    <p className="text-sm leading-relaxed">
                        Az adatokat a Supabase rendszerében tároljuk, biztonságos szervereken. Az adatokhoz csak az arra jogosult
                        személyek férhetnek hozzá. Az adatokat a szükséges ideig őrizzük meg, majd töröljük.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">5. Adattovábbítás</h2>
                    <p className="text-sm leading-relaxed">
                        A megadott adatokat nem adjuk át harmadik félnek, és nem használjuk fel marketing célokra
                        az érintett kifejezett hozzájárulása nélkül.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">6. Érintetti jogok</h2>
                    <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                        <li>Hozzáférés a tárolt adatokhoz</li>
                        <li>Helyesbítés, törlés (“elfeledtetéshez való jog”)</li>
                        <li>Az adatkezelés korlátozása, tiltakozás</li>
                        <li>Hozzájárulás visszavonása</li>
                    </ul>
                    <p className="text-sm leading-relaxed mt-2">
                        Kéréseiddel a fenti elérhetőségeken veheted fel velünk a kapcsolatot.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">7. Panasz és jogorvoslat</h2>
                    <p className="text-sm leading-relaxed">
                        Panasz esetén a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) fordulhatsz:
                    </p>
                    <ul className="text-sm leading-relaxed mt-2">
                        <li>Cím: 1055 Budapest, Falk Miksa utca 9–11.</li>
                        <li>
                            Weboldal:{" "}
                            <a
                                href="https://naih.hu"
                                target="_blank"
                                rel="noreferrer"
                                className="underline text-amber-700 hover:text-amber-800"
                            >
                                naih.hu
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">8. Módosítás</h2>
                    <p className="text-sm leading-relaxed">
                        Az Adatkezelő fenntartja a jogot a tájékoztató módosítására. A változások a közzététel napjától hatályosak.
                    </p>
                </div>
            </section>

            <footer className="mt-10 text-xs text-stone-500">
                Vissza a{" "}
                <Link href="/" className="underline text-amber-700 hover:text-amber-800">
                    kezdőlapra
                </Link>
                .
            </footer>
        </main>
    );
}
