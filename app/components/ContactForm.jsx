'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabasePublic as supabase } from '@/lib/supabasePublicClient';

export default function ContactForm() {
    // local state
    const [consent, setConsent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [msg, setMsg] = useState(null);
    const [err, setErr] = useState(null);

    // boot debug (env presence etc.)
    useEffect(() => {
        console.group('[contact] boot');
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        console.log('env URL?', url ? 'OK' : 'MISSING');
        console.log('env KEY?', key ? `OK (${key.slice(0, 10)}...${key.slice(-6)})` : 'MISSING');
        console.groupEnd();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setMsg(null);
        setErr(null);

        const form = e.currentTarget;

        try {
            const fd = new FormData(form);
            const payload = {
                name: (fd.get('name') || '').toString().trim(),
                email: (fd.get('email') || '').toString().trim(),
                phone: (fd.get('phone') || '').toString().trim(),
                message: (fd.get('message') || '').toString(),
                consent: true,
                user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
                status: 'new',
            };

            console.group('[contact] submit');
            console.log('payload', payload);

            if (!payload.name || !payload.email) {
                setErr('Kérjük add meg a nevet és az e-mail címet.');
                console.warn('guard failed: missing name/email');
                return;
            }
            if (!consent) {
                setErr('Kérjük fogadd el az adatkezelési hozzájárulást.');
                console.warn('guard failed: consent is false');
                return;
            }

            // ✅ Call SECURITY DEFINER RPC (bypasses RLS for INSERT)
            const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/insert_contact_message`;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            console.log('[contact rpc] url', url);
            console.log('[contact rpc] key', key?.slice(0, 10) + '...' + key?.slice(-6));

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    apikey: key,
                    Authorization: `Bearer ${key}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ p: payload }),
            });

            let body = null;
            try {
                body = await res.json();
            } catch {
                body = await res.text().catch(() => null);
            }
            console.log('[contact rpc] status', res.status, body);

            if (!res.ok) {
                throw new Error(`RPC failed (${res.status}): ${body?.message || res.statusText}`);
            }

            setMsg('Köszönjük! Hamarosan jelentkezünk.');
            form.reset();
            setConsent(false);
        } catch (e) {
            console.error('[contact] FAILED', e);
            setErr(e?.message || 'Hiba történt az üzenet küldésekor.');
        } finally {
            console.groupEnd?.();
            setSubmitting(false);
        }
    }


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3 className="mb-4">Teljes Név</h3>
                    <input
                        name="name"
                        type="text"
                        className="input required:true w-full"
                        placeholder="Írd be a neved"
                    />
                </div>

                <div className="mt-4">
                    <h3 className="mb-2">Email</h3>
                    <input
                        name="email"
                        type="email"
                        className="input required:true w-full"
                        placeholder="nev@email.hu"
                    />
                </div>

                <div className="mt-4">
                    <h3 className="mb-4">Telefon</h3>
                    <input
                        name="phone"
                        type="text"
                        className="input required:true w-full"
                        placeholder="+36 …"
                    />
                </div>

                <div className="mt-4">
                    <h3 className="mb-2">Üzenet</h3>
                    <textarea
                        name="message"
                        className="input w-full min-h-[100px]"
                        placeholder="Miben segíthetünk?"
                        rows={5}
                    />
                </div>

                {/* Consent */}
                <div className="mt-4 rounded-lg border border-stone-200 bg-stone-100/70 p-4">
                    <label htmlFor="consent" className="flex items-start gap-3 text-sm text-stone-700">
                        <input
                            id="consent"
                            type="checkbox"
                            required
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
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

                <div className="mt-4 flex flex-col items-center gap-2">
                    <button className="button_send" type="submit" disabled={submitting}>
                        {submitting ? 'Küldés…' : 'Küldés'}
                    </button>
                    {msg && <p className="text-sm text-emerald-700">{msg}</p>}
                    {err && <p className="text-sm text-red-600">{err}</p>}
                </div>
            </form>
        </section>
    );
}
