"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    X,
    MapPin,
    Ruler,
    Info,
    Tag,
    Paperclip,
    FileText,
    Download,
    Mail,
    Loader2,
    CheckCircle,
} from "lucide-react";
import { ACCENT } from "@/app/components/admin/constants";
import { supabase } from "@/lib/supabaseClient";
import { formatDate } from "@/app/components/admin/utils";
import Field from "@/app/components/admin/Field";
import StatusPill from "@/app/components/admin/StatusPill";

export default function DetailsDrawer({ inquiry, onClose, onStatusChange, onToast }) {
    const [sending, setSending] = useState(false);
    const [reply, setReply] = useState({ subject: "", message: "" });
    const [status, setStatus] = useState(inquiry?.status || "new");

    useEffect(() => {
        if (inquiry) {
            setReply({
                subject: `Re: ${inquiry.subject ?? "Árajánlatkérés"}`,
                message: "",
            });
            setStatus(inquiry.status || "new");
        }
    }, [inquiry]);

    const services = useMemo(() => {
        if (!inquiry) return [];
        if (Array.isArray(inquiry.services) && inquiry.services.length) return inquiry.services;
        const out = [];
        if (inquiry.consultation) out.push("Tanácsadás");
        if (inquiry.price_request) out.push("Árajánlatkérés");
        return out;
    }, [inquiry]);

    const sendEmail = async () => {
        if (!inquiry) return;
        if (!inquiry.email) {
            onToast?.({ type: "error", message: "Hiányzik az ügyfél e-mail címe." });
            return;
        }

        setSending(true);
        try {
            const payload = {
                to: inquiry.email,
                subject: reply.subject?.trim() || `Re: ${inquiry.subject ?? "Árajánlatkérés"}`,
                message: reply.message || "",
                footerNote: "Ha kérdése van, erre a levélre válaszolhat.",
            };

            const r = await fetch("/api/admin/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!r.ok) throw new Error("Send failed");
            onToast?.({ type: "success", message: "Válasz elküldve az ügyfélnek." });
            onStatusChange?.("answered");

            await supabase.from("outbox_emails").insert({
                inquiry_id: inquiry?.id ?? null,
                contact_id: null,
                to_email: payload.to,
                subject: payload.subject,
                message: payload.message,
                sent_at: new Date().toISOString(),
            });
        } catch (e) {
            console.error(e);
            onToast?.({ type: "error", message: "Hiba történt az e-mail küldésekor." });
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {inquiry && (
                <motion.aside
                    key="details-drawer"
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
                                <div className="text-sm text-gray-500">#{inquiry.id.slice(0, 8)}</div>
                                <h3 className="text-lg font-semibold">{inquiry.name}</h3>
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
                            {/* Contact info */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Kapcsolat</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                    <Field label="E-mail" value={inquiry.email} copyable />
                                    {inquiry.phone && <Field label="Telefon" value={inquiry.phone} />}
                                    <Field label="Érkezett" value={formatDate(inquiry.created_at)} />
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
                                            <option value="in_review">Folyamatban</option>
                                            <option value="answered">Válaszolt</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Services */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-3">Kért szolgáltatások</h4>
                                {services.length ? (
                                    <div className="flex flex-wrap gap-2">
                                        {services.map((s, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200"
                                            >
                        {s}
                      </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600">—</p>
                                )}
                                <div className="mt-4">
                                    <div className="text-xs text-gray-500">Hol hallott rólunk</div>
                                    <div className="text-sm text-gray-800">{inquiry.ref_source || "-"}</div>
                                </div>
                            </section>

                            {/* Message */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Üzenet</h4>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                            </section>

                            {/* Files */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <Paperclip size={18} /> Csatolt fájlok
                                </h4>
                                {inquiry.files?.length ? (
                                    <ul className="space-y-2">
                                        {inquiry.files.map((f, idx) => (
                                            <li key={idx} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-gray-800 overflow-hidden">
                                                    <FileText size={16} />
                                                    <span className="truncate" title={f.name}>
                            {f.name}
                          </span>
                                                </div>
                                                <a
                                                    href={f.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 text-[#AD4949] hover:underline"
                                                    style={{ color: ACCENT }}
                                                >
                                                    <Download size={16} /> Letöltés
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-600">Nincs csatolmány.</p>
                                )}
                            </section>

                            {/* Reply form */}
                            <section className="bg-white rounded-xl border border-gray-200 p-4">
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
                                            style={{ backgroundColor: ACCENT }}
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
