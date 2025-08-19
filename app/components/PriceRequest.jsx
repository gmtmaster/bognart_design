'use client'

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import BlueprintUploader from "@/app/components/BluePrintUploader";
import { supabasePublic as supabase } from '@/lib/supabasePublicClient';

function PriceRequest() {
    // services + consent
    const [wantConsultation, setWantConsultation] = useState(false);
    const [wantPriceRequest, setWantPriceRequest] = useState(false);
    const [consent, setConsent] = useState(false);

    // files from BlueprintUploader (still works; not the source of 401)
    const [filesSelected, setFilesSelected] = useState([]); // File[]

    // UX
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState(null);
    const [submitErr, setSubmitErr] = useState(null);

    useEffect(() => {
        console.group('[PriceRequest] boot');
        console.log('env URL?', !!process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'MISSING');
        console.log('env KEY?', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'OK' : 'MISSING');
        console.groupEnd();
    }, []);

    // ----- helper: direct insert via PostgREST with explicit headers -----
    async function insertInquiryDirect(payload) {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/inquiries?select=*`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,             // << required
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`, // << required
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
            },
            body: JSON.stringify([payload]),
        });

        let json = null;
        try { json = await res.json(); } catch (_) { /* ignore */ }

        if (!res.ok) {
            const msg = (json && (json.message || json.error)) || res.statusText;
            const err = new Error(`Insert failed (${res.status}): ${msg}`);
            err.status = res.status;
            err.details = json;
            throw err;
        }
        // since we sent an array, PostgREST returns an array
        return Array.isArray(json) ? json[0] : json;
    }

    async function notifyAdmin(summary) {
        try {
            await fetch('/api/inquiry-admin-ping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ summary }),
            });
        } catch (_) {
            // Don't block UX on email failure; just ignore.
        }
    }

    async function handleSubmit(e) {
        console.log('[submit] handler entered');
        e.preventDefault();

        // ✅ capture the form element now (before awaits)
        const form = e.currentTarget;

        setSubmitting(true);
        setSubmitMsg(null);
        setSubmitErr(null);

        try {
            // ----- read values from the form -----
            const fd = new FormData(form);
            const nameVal      = (fd.get('name')     || '').toString().trim();
            const emailVal     = (fd.get('email')    || '').toString().trim();
            const phoneVal     = (fd.get('phone')    || '').toString().trim();
            const locationVal  = (fd.get('location') || '').toString().trim();
            const sizeVal      = (fd.get('size')     || '').toString().trim();
            const conditionVal = (fd.get('condition')|| '').toString();
            const packageVal   = (fd.get('package')  || '').toString();
            const refVal       = (fd.get('ref')      || '').toString();
            const messageVal   = (fd.get('message')  || '').toString();

            console.log('[submit] values', {
                nameVal, emailVal, phoneVal, locationVal, sizeVal,
                conditionVal, packageVal, refVal, messageLen: messageVal.length, consent
            });

            // ----- guards -----
            if (!nameVal || !emailVal) {
                setSubmitErr('Kérjük add meg a nevet és az e-mail címet.');
                setSubmitting(false);
                return;
            }
            if (!consent) {
                setSubmitErr('Kérjük pipáld be az adatkezelési hozzájárulást.');
                setSubmitting(false);
                return;
            }

            // ----- 1) Upload files to Supabase Storage (optional) -----
            const uploaded = [];
            const bucket = 'inquiry-files';
            const inquiryId =
                (typeof crypto !== 'undefined' && crypto.randomUUID)
                    ? crypto.randomUUID()
                    : Math.random().toString(36).slice(2);

            if (filesSelected && filesSelected.length) {
                console.log(`[upload] starting ${filesSelected.length} file(s), inquiryId=${inquiryId}`);
                for (const [idx, file] of filesSelected.entries()) {
                    console.group(`[upload ${idx + 1}/${filesSelected.length}]`);
                    try {
                        console.log('candidate', { name: file?.name, size: file?.size, type: file?.type });
                        if (!(file instanceof File)) {
                            console.warn('BlueprintUploader did not pass a File instance:', file);
                        }

                        const safeName = (file?.name || `file-${idx}`).replace(/\s+/g, '-');
                        const path = `${inquiryId}/${Date.now()}-${safeName}`;

                        const { data: uploadData, error: upErr } = await supabase
                            .storage
                            .from(bucket)
                            .upload(path, file, {
                                cacheControl: '3600',
                                upsert: false,
                                contentType: file?.type || undefined,
                            });

                        console.log('upload result', { uploadData, upErr });
                        if (upErr) throw upErr;

                        // public URL for the uploaded file
                        const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);

                        const rec = {
                            name: file?.name || safeName,
                            path,
                            url: pub?.publicUrl || null,
                            size: file?.size || null,
                            type: file?.type || null,
                        };

                        uploaded.push(rec);
                        console.log('public record', rec);
                    } catch (fileErr) {
                        console.error('upload error', fileErr);
                        // If any file upload fails, stop the submission.
                        throw fileErr;
                    } finally {
                        console.groupEnd();
                    }
                }
            } else {
                console.log('[upload] no files to upload');
            }

            // ----- 2) Build services from checkboxes -----
            const services = [];
            if (wantConsultation) services.push('Tanácsadás');
            if (wantPriceRequest) services.push('Árajánlatkérés');
            console.log('services', services);

            // ----- 3) Build payload for RPC insert -----
            const payload = {
                name:        nameVal,
                email:       emailVal,
                phone:       phoneVal,
                location:    locationVal,
                size_text:   sizeVal,
                condition:   conditionVal,
                package:     packageVal,
                services,
                ref_source:  refVal,
                message:     messageVal,
                files:       uploaded, // array of { name, path, url, size, type }
                consent:     true,     // must be true for your rule
                user_agent:  typeof navigator !== 'undefined' ? navigator.userAgent : null,
            };

            console.log('insert payload', payload);

            // ----- 4) Call RPC to bypass table RLS for insert -----
            const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/insert_inquiry`;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            console.log('[rpc] url', url);
            console.log('[rpc] key prefix/suffix:', key?.slice(0, 10) + '...' + key?.slice(-6));

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    apikey: key,
                    Authorization: `Bearer ${key}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ p: payload }),
            });

            // RPC returns the UUID as JSON (a simple string)
            const body = await res.json().catch(() => ({}));
            console.log('[rpc] status', res.status, body);

            if (!res.ok) {
                throw new Error(`RPC failed (${res.status}): ${body?.message || res.statusText}`);
            }

            //New: send Resend admin ping

            const summaryLines = [
                `Név: ${nameVal || '—'}`,
                `Email: ${emailVal || '—'}`,
                `Telefon: ${phoneVal || '—'}`,
                `Szolgáltatások: ${(services && services.length) ? services.join(', ') : '—'}`,
                `Csomag: ${packageVal || '—'}`,
                `Helyszín: ${locationVal || '—'}`,
                `Méret: ${sizeVal || '—'}`,
                `Állapot: ${conditionVal || '—'}`,
                `Forrás: ${refVal || '—'}`,
            ];

            notifyAdmin(summaryLines.join('\n'));

            // ----- 5) UX success -----
            setSubmitMsg('Köszönjük! Az árajánlatkérésedet megkaptuk. Hamarosan jelentkezünk.');
            form?.reset();                 // ✅ reset using captured form (not e.currentTarget)
            setFilesSelected([]);          // clear local state
            setWantConsultation(false);
            setWantPriceRequest(false);
            setConsent(false);

        } catch (err) {
            console.error('[PriceRequest] FAILED', err);
            setSubmitErr(err?.message || 'Hoppá! Nem sikerült elküldeni. Kérjük, próbáld újra.');
        } finally {
            setSubmitting(false);
        }
    }



    return (
        <section className="min-h-screen py-28 px-4 flex justify-center items-start ">
            <div className="w-full max-w-lg rounded-xl border border-stone-200 bg-white shadow-xl flex flex-col ">
                <div className="px-6 py-4 bg-white rounded-2xl z-10">
                    <h1 className="text-2xl font-bold text-stone-800">Árajánlatkérés</h1>
                </div>

                <div className="overflow-y-auto px-6 py-4 space-y-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Név */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-700">Név</label>
                            <input name="name" id="name" type="text" placeholder="Írd be a neved"
                                   className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]" />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                            <input name="email" id="email" type="email" placeholder="nev@email.hu"
                                   className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]" />
                        </div>

                        {/* Telefon */}
                        <div>
                            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-stone-700">Telefon</label>
                            <input name="phone" id="phone" type="tel" placeholder="+36 …"
                                   className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]" />
                        </div>

                        {/* Ingatlan elhelyezkedése */}
                        <div>
                            <label htmlFor="location" className="mb-1 block text-sm font-medium text-stone-700">Ingatlan elhelyezkedése</label>
                            <input name="location" id="location" type="text" placeholder="Város, kerület / cím"
                                   className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]" />
                        </div>

                        {/* Ingatlan mérete */}
                        <div>
                            <label htmlFor="size" className="mb-1 block text-sm font-medium text-stone-700">Ingatlan mérete</label>
                            <input name="size" id="size" type="text" placeholder="pl. 65 m²"
                                   className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]" />
                        </div>

                        {/* Ingatlan állapota */}
                        <div>
                            <label htmlFor="condition" className="mb-1 block text-sm font-medium text-stone-700">Ingatlan állapota</label>
                            <select name="condition" id="condition"
                                    className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]">
                                <option value="">Válassz…</option>
                                <option>Új építésű ingatlan</option>
                                <option>Felújítandó ingatlan</option>
                                <option>Építés alatt álló ingatlan</option>
                                <option>Tervezés alatt álló ingatlan</option>
                                <option>Egyéb</option>
                            </select>
                        </div>

                        {/* Választott tervezési csomag */}
                        <div>
                            <label htmlFor="package" className="mb-1 block text-sm font-medium text-stone-700">Választott tervezési csomag</label>
                            <select name="package" id="package"
                                    className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]">
                                <option value="">Válassz…</option>
                                <option>Konzultáció</option>
                                <option>Basic csomag</option>
                                <option>Premium csomag</option>
                                <option>Konyhatervezés</option>
                            </select>
                        </div>

                        {/* Checkboxok (now wired to state) */}
                        <div className="flex flex-wrap gap-6">
                            <label className="inline-flex items-center gap-2 text-stone-700">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#CA8A8A]"
                                    checked={wantConsultation}
                                    onChange={(e) => setWantConsultation(e.target.checked)}
                                />
                                Tanácsadás
                            </label>
                            <label className="inline-flex items-center gap-2 text-stone-700">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#CA8A8A]"
                                    checked={wantPriceRequest}
                                    onChange={(e) => setWantPriceRequest(e.target.checked)}
                                />
                                Árajánlatkérés
                            </label>
                        </div>

                        {/* Hol hallott rólunk */}
                        <div>
                            <label htmlFor="ref" className="mb-1 block text-sm font-medium text-stone-700">
                                Hol hallott a BOGNARTról?
                            </label>
                            <select
                                name="ref"                 // <-- important
                                id="ref"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
                            >
                                <option value="">Válassz…</option>
                                <option>Google</option>
                                <option>Instagram</option>
                                <option>Facebook</option>
                                <option>TikTok</option>
                                <option>Ismerős ajánlotta</option>
                                <option>Egyéb</option>
                            </select>
                        </div>

                        {/* Üzenet */}
                        <div>
                            <label htmlFor="message" className="mb-1 block text-sm font-medium text-stone-700">Üzenet</label>
                            <textarea
                                name="message"
                                rows={4}
                                id="message"
                                placeholder="Miben segíthetünk?"
                                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-[#CA8A8A] focus:outline-none focus:ring-2 focus:ring-[#CA8A8A]"
                            />
                        </div>

                        {/* Alaprajz feltöltés (opcionális) */}
                        <BlueprintUploader
                            maxFiles={3}
                            onChange={(files) => setFilesSelected(files)}
                        />

                        {/* Consent */}
                        <div className="rounded-lg border border-stone-200 bg-stone-100/70 p-4">
                            <label htmlFor="consent" className="flex items-start gap-3 text-sm text-stone-700">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    required
                                    checked={consent}
                                    onChange={(e) => { console.log('consent changed:', e.target.checked); setConsent(e.target.checked); }}
                                    className="mt-0.5 h-4 w-4"
                                />
                                <span>
                  Elolvastam és elfogadom a{' '}
                                    <Link href="/policies/terms" className="font-medium text-[#CA8A8A] hover:text-[#AD4949] underline">
                    Felhasználási feltételeket
                  </Link>{' '} és az{' '}
                                    <Link href="/policies/privacy" className="font-medium text-[#CA8A8A] hover:text-[#AD4949] underline">
                    Adatvédelmi tájékoztatót
                  </Link>.
                </span>
                            </label>
                            <p className="mt-2 text-xs text-stone-500">Az űrlap beküldésével hozzájárulsz az adataid kezeléséhez.</p>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col items-center gap-3">
                            <button type="submit" className="button" disabled={submitting} onClick={() => console.log('[submit] button click')}>
                                {submitting ? 'Küldés…' : 'Küldés'}
                            </button>
                            {submitMsg && <p className="text-sm text-emerald-700">{submitMsg}</p>}
                            {submitErr && <p className="text-sm text-red-600">{submitErr}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default PriceRequest;
