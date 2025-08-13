'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'cookieConsent.v1';

const defaultPrefs = {
    necessary: true,   // always on, not toggleable
    analytics: false,
    functional: false,
    marketing: false,
    timestamp: null,
};

function loadPrefs() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function savePrefs(prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }));
}

export function useCookieConsent() {
    // Optional hook for gating scripts in your app
    const [prefs, setPrefs] = useState(defaultPrefs);
    useEffect(() => {
        const p = loadPrefs();
        if (p) setPrefs(p);
    }, []);
    return prefs;
}

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false);
    const [showMiniBar, setShowMiniBar] = useState(false);
    const [prefs, setPrefs] = useState(defaultPrefs);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        const existing = loadPrefs();
        if (!existing) {
            setIsOpen(true);         // first visit -> open modal
            setPrefs(defaultPrefs);
        } else {
            setPrefs(existing);
            // If user rejected non-essential (all false), show the mini bar
            const rejectedAll = !existing.analytics && !existing.functional && !existing.marketing;
            setShowMiniBar(rejectedAll);
        }
    }, []);

    const allOn = useMemo(
        () => prefs.analytics && prefs.functional && prefs.marketing,
        [prefs]
    );

    const handleAcceptAll = () => {
        const next = { ...prefs, analytics: true, functional: true, marketing: true };
        savePrefs(next);
        setPrefs(next);
        setIsOpen(false);
        setShowMiniBar(false);
    };

    const handleRejectAll = () => {
        const next = { ...prefs, analytics: false, functional: false, marketing: false };
        savePrefs(next);
        setPrefs(next);
        setIsOpen(false);
        setShowMiniBar(true); // keep slim bar visible if declined
    };

    const handleSave = () => {
        savePrefs(prefs);
        setIsOpen(false);
        const rejectedAll = !prefs.analytics && !prefs.functional && !prefs.marketing;
        setShowMiniBar(rejectedAll);
    };

    const Toggle = ({ label, checked, onChange, disabled }) => (
        <label className="flex items-center justify-between gap-4 py-2">
            <span className="text-sm md:text-base">{label}</span>
            <button
                type="button"
                aria-pressed={checked}
                onClick={() => !disabled && onChange(!checked)}
                className={`w-12 h-7 rounded-full relative transition 
          ${disabled ? 'bg-gray-300 cursor-not-allowed' : checked ? 'bg-[#AD4949]' : 'bg-gray-300'}`}
            >
        <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform
          ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
            </button>
        </label>
    );

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            role="dialog" aria-modal="true" aria-labelledby="cookie-title"
                        >
                            <h2 id="cookie-title" className="text-2xl font-bold mb-2">Cookie-szabályzat</h2>
                            <p className="text-gray-700 mb-4 text-sm">
                                Weboldalunk sütiket (cookie-kat) használ a felhasználói élmény javításához,
                                a forgalom elemzéséhez és bizonyos funkciók biztosításához. A szükséges sütik
                                a webhely működéséhez elengedhetetlenek, ezeket nem lehet kikapcsolni.
                            </p>

                            <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-4 space-y-2">
                                <Toggle label="Szükséges sütik (mindig aktív)" checked={true} onChange={()=>{}} disabled />
                                <hr className="border-gray-200" />
                                <Toggle
                                    label="Analitikai sütik"
                                    checked={prefs.analytics}
                                    onChange={(v) => { setPrefs(s => ({ ...s, analytics: v })); setTouched(true); }}
                                />
                                <Toggle
                                    label="Funkcionális sütik"
                                    checked={prefs.functional}
                                    onChange={(v) => { setPrefs(s => ({ ...s, functional: v })); setTouched(true); }}
                                />
                                <Toggle
                                    label="Marketing sütik"
                                    checked={prefs.marketing}
                                    onChange={(v) => { setPrefs(s => ({ ...s, marketing: v })); setTouched(true); }}
                                />
                            </div>

                            <details className="mt-4 text-sm text-gray-700">
                                <summary className="cursor-pointer font-medium">Részletek</summary>
                                <div className="mt-2 space-y-2">
                                    <p><strong>Szükséges:</strong> Alapvető működés (navigáció, űrlapok, munkamenetek).</p>
                                    <p><strong>Analitikai:</strong> Névtelen látogatottsági és teljesítményadatok.</p>
                                    <p><strong>Funkcionális:</strong> Beállítások megjegyzése (pl. nyelv).</p>
                                    <p><strong>Marketing:</strong> Személyre szabott tartalmak, remarketing.</p>
                                </div>
                            </details>

                            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                                <button
                                    onClick={handleRejectAll}
                                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                                    title="Csak a szükséges sütik engedélyezése"
                                >
                                    Csak szükséges
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 rounded-lg border border-[#AD4949] text-[#AD4949] hover:bg-[#AD4949]/10"
                                    disabled={!touched && !loadPrefs()} // saves even if not touched on first-time; small guard is fine
                                >
                                    Mentés
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="px-4 py-2 rounded-lg bg-[#AD4949] text-white hover:bg-[#922f2f]"
                                >
                                    Elfogadom mindet
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom-right floating icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-[900] p-3 bg-[#AD4949] text-white rounded-full shadow-lg hover:bg-[#922f2f] transition"
                title="Cookie-beállítások megnyitása"
                aria-label="Cookie-beállítások"
            >
                🍪
            </button>

            {/* Slim mini-bar (shown after 'Csak szükséges') */}
            <AnimatePresence>
                {showMiniBar && (
                    <motion.div
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[950] bg-black/80 text-white rounded-full px-4 py-2 shadow"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    >
                        <span className="text-sm">Csak szükséges sütik engedélyezve.</span>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="ml-3 underline underline-offset-4 text-sm"
                        >
                            Módosítás
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
