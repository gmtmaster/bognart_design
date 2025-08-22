"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Field from "@/app/components/admin/Field";
import { formatDate } from "@/app/components/admin/utils";

export default function OutboxDrawer({ email, onClose }) {
    return (
        <AnimatePresence>
            {email && (
                <motion.aside
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                    className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50"
                >
                    <div className="h-full grid grid-rows-[auto,1fr]">
                        <div className="border-b px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur">
                            <div>
                                <div className="text-sm text-gray-500">Kimenő levél</div>
                                <h3 className="text-lg font-semibold truncate max-w-[20rem]">
                                    {email.subject}
                                </h3>
                            </div>
                            <button
                                className="rounded-full p-2 hover:bg-gray-100"
                                onClick={onClose}
                                aria-label="Bezárás"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-4 space-y-6">
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <Field label="Címzett" value={email.to_email} copyable />
                                    <Field label="Küldve" value={formatDate(email.sent_at)} />
                                    {email.inquiry_id && (
                                        <Field label="Inquiry ID" value={email.inquiry_id} copyable />
                                    )}
                                    {email.contact_id && (
                                        <Field label="Contact ID" value={email.contact_id} copyable />
                                    )}
                                </div>
                            </section>

                            <section className="bg-white rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Üzenet</h4>
                                <div className="text-sm text-gray-800 whitespace-pre-wrap">
                                    {email.message}
                                </div>
                            </section>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `Tárgy: ${email.subject}\nCímzett: ${email.to_email}\nKüldve: ${formatDate(
                                                email.sent_at
                                            )}\n\n${email.message}`
                                        );
                                    }}
                                    className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50"
                                >
                                    Másolás
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
