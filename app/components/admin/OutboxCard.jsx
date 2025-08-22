"use client";

import { formatDate } from "@/app/components/admin/utils";

export default function OutboxCard({ outbox, onOpenEmail }) {
    return (
        <div className="bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl p-4">
            <h3 className="font-semibold mb-3">Kimenő levelek</h3>
            {!outbox || outbox.length === 0 ? (
                <p className="text-sm text-gray-600">Még nincs elküldött e-mail.</p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {outbox.map((e) => (
                        <li key={e.id} className="py-2">
                            <button
                                className="w-full text-left group"
                                onClick={() => onOpenEmail?.(e)}
                                title={e.subject}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-medium text-gray-900">
                                            {e.subject}
                                        </div>
                                        <div className="truncate text-xs text-gray-600">
                                            {e.to_email}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 shrink-0">
                                        {formatDate(e.sent_at)}
                                    </div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
