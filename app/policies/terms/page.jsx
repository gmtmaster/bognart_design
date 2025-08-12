// app/terms/page.jsx
"use client";
import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-stone-800">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">Általános Szerződési Feltételek</h1>
                <p className="mt-2 text-sm text-stone-500">Hatályos: 2025. augusztus 12.</p>
            </header>

            <section className="space-y-8">
                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">1. Szolgáltató adatai</h2>
                    <ul className="space-y-1 text-sm leading-relaxed">
                        <li><span className="font-medium">Szolgáltató neve:</span> 🔧 BOGNART</li>
                        <li><span className="font-medium">Székhely:</span> 🔧 [cím]</li>
                        <li><span className="font-medium">E-mail:</span> 🔧 [email]</li>
                        <li><span className="font-medium">Weboldal:</span> 🔧 [domain]</li>
                        <li><span className="font-medium">Üzemeltetés:</span> Domain: Dynadot.com, hosztolás: Vercel.</li>
                    </ul>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">2. Szolgáltatás tárgya</h2>
                    <p className="text-sm leading-relaxed">
                        A weboldalon keresztül belsőépítészeti és tervezési szolgáltatásokra lehet árajánlatot kérni,
                        valamint kapcsolatba lépni a Szolgáltatóval.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">3. Regisztráció és adatkezelés</h2>
                    <p className="text-sm leading-relaxed">
                        A weboldal nem igényel felhasználói regisztrációt. Az árajánlatkéréshez szükséges adatok
                        megadása kötelező. Az adatkezelés az{" "}
                        <Link href="/privacy" className="underline text-amber-700 hover:text-amber-800">
                            Adatvédelmi tájékoztató
                        </Link>{" "}
                        szerint történik.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">4. Felelősség</h2>
                    <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                        <li>Időszakos üzemszünetekből, technikai hibákból eredő károkért.</li>
                        <li>Internetkapcsolat megszakadásából fakadó károkért.</li>
                        <li>Harmadik fél jogosulatlan hozzáféréséből eredő károkért.</li>
                    </ul>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">5. Szerzői jogok</h2>
                    <p className="text-sm leading-relaxed">
                        A weboldalon elérhető tervek, információk és fotók a tervező kizárólagos szellemi tulajdonát képezik.
                        Ezek engedély nélküli publikálása, megosztása, másolása vagy bármilyen módú felhasználása jogsértő,
                        és jogkövetkezményeket von maga után.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">6. Kapcsolattartás</h2>
                    <p className="text-sm leading-relaxed">
                        A kommunikáció elsődlegesen e-mailben történik. Az űrlap beküldésével a felhasználó elfogadja a jelen
                        feltételeket.
                    </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white/60 p-6">
                    <h2 className="text-lg font-semibold mb-3">7. Módosítás</h2>
                    <p className="text-sm leading-relaxed">
                        A Szolgáltató fenntartja a jogot a feltételek módosítására. A változások a közzététel napjától hatályosak.
                    </p>
                </div>
            </section>
        </main>
    );
}
