"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Field from "@/app/components/admin/Field";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ContactDrawer({
                                          contact,
                                          onClose,
                                          onStatusChange,
                                          onToast,
                                          accent = "#AD4949",
                                      }) {
    const [sending, setSending] = useState(false);
    const [reply, setReply] = useState({ subject: "", message: "" });
    const [status, setStatus] = useState(contact?.status || "new");
    const replyBoxRef = useRef(null);

    useEffect(() => {
        if (!contact) return;
        setReply({
            subject: `Re: Kapcsolatfelvétel – ${contact.name ?? ""}`.trim(),
            message: "",
        });
        setStatus(contact.status || "new");

        if (contact._focusReply) {
            setTimeout(
                () =>
                    replyBoxRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    }),
                200
            );
        }
    }, [contact]);

    const sendEmail = async () => {
        if (!contact) return;
        if (!contact.email) {
            onToast?.({ type: "error", message: "Hiányzik az e-mail cím." });
            return;
        }

        setSending(true);
        try {
            const payload = {
                to: contact.email,
                subject:
                    reply.subject?.trim() ||
                    `Re: Kapcsolatfelvétel – ${contact.name ?? ""}`.trim(),
                message: reply.message || "",
                footerNote: "Ha kérdése van, erre a levélre válaszolhat.",
            };

            const r = await fetch("/api/admin/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!r.ok) throw new Error("Send failed");

            onToast?.({ type: "success", message: "Válasz elküldve." });
            onStatusChange?.("answered");

            // Log outgoing mail to Supabase
            await supabase.from("outbox_emails").insert({
                inquiry_id: null,
                contact_id: contact?.id ?? null,
                to_email: payload.to,
                subject: payload.subject,
                message: payload.message,
                sent_at: new Date().toISOString(),
            });
        } catch (e) {
            console.error(e);
            onToast?.({ type: "error", message: "Hiba történt a küldésnél." });
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {contact && (
                <motion.aside
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                    className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50"
                >
                    <div className="h-full grid grid-rows-[auto,1fr]">
                        {/* Header */}
                        <div className="border-b px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur">
                            <div>
                                <div className="text-sm text-gray-500">
                                    #{contact.id.slice(0, 8)}
                                </div>
                                <h3 className="text-lg font-semibold">{contact.name}</h3>
                            </div>
                            <button
                                className="rounded-full p-2 hover:bg-gray-100"
                                onClick={onClose}
                                aria-label="Bezárás"
                            >
                                <X />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-4 space-y-6">
                            {/* Contact Info */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Kapcsolat</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                    <Field label="E-mail" value={contact.email} copyable />
                                    {contact.phone && (
                                        <Field label="Telefon" value={contact.phone} />
                                    )}
                                    <Field
                                        label="Érkezett"
                                        value={new Date(contact.created_at).toLocaleString("hu-HU")}
                                    />
                                    <div>
                                        <label className="text-xs text-gray-500">Állapot</label>
                                        <select
                                            value={status}
                                            onChange={(e) => {
                                                setStatus(e.target.value);
                                                onStatusChange?.(e.target.value);
                                            }}
                                            className="mt-1 text-sm rounded-lg border border-gray-300 px-2 py-1"
                                        >
                                            <option value="new">Új</option>
                                            <option value="answered">Válaszolt</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Message */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Üzenet</h4>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {contact.message}
                                </p>
                                {contact.user_agent && (
                                    <p className="mt-3 text-xs text-gray-500">
                                        UA: {contact.user_agent}
                                    </p>
                                )}
                            </section>

                            {/* Reply */}
                            <section
                                ref={replyBoxRef}
                                className="bg-white rounded-xl border border-gray-200 p-4"
                            >
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <Mail size={18} /> Válasz e-mailben
                                </h4>
                                <div className="space-y-3">
                                    <input
                                        value={reply.subject}
                                        onChange={(e) =>
                                            setReply((r) => ({ ...r, subject: e.target.value }))
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                                        placeholder="Tárgy"
                                    />
                                    <textarea
                                        value={reply.message}
                                        onChange={(e) =>
                                            setReply((r) => ({ ...r, message: e.target.value }))
                                        }
                                        rows={6}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                                        placeholder="Üzenet szövege…"
                                    />
                                    <div className="flex items-center justify-between">
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                            <input type="checkbox" className="rounded" />
                                            Ajánlat csatolása (PDF)
                                        </label>
                                        <button
                                            disabled={sending}
                                            onClick={sendEmail}
                                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white"
                                            style={{ backgroundColor: accent }}
                                        >
                                            {sending ? (
                                                <Loader2 className="animate-spin" size={16} />
                                            ) : (
                                                <CheckCircle size={16} />
                                            )}
                                            Küldés
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
