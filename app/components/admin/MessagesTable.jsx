"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ChevronRight } from "lucide-react";
import FilterDropdown from "@/app/components/admin/FilterDropdown";
import SearchInput from "@/app/components/admin/SearchInput";
import StatusPill from "@/app/components/admin/StatusPill";
import { formatDate } from "@/app/components/admin/utils";
import { ACCENT } from "@/app/components/admin/constants";

export default function MessagesTable({ contacts, onOpen }) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [query, setQuery] = useState("");

    const filteredContacts = useMemo(() => {
        let list = contacts;
        if (statusFilter !== "all") {
            list = list.filter((c) => c.status === statusFilter);
        }
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter((c) =>
                [c.name, c.email, c.message].some((v) => v?.toLowerCase().includes(q))
            );
        }
        return list;
    }, [contacts, statusFilter, query]);

    const loading = false; // could be passed from props if needed

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-4 md:p-6"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-gray-900">
                    <h1 className="text-xl md:text-2xl font-bold">Üzenetek</h1>
                    <span className="text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
            {contacts.length} db
          </span>
                </div>
                <div className="flex gap-2">
                    <FilterDropdown value={statusFilter} onChange={setStatusFilter} />
                    <SearchInput value={query} onChange={setQuery} />
                </div>
            </div>

            {/* Table */}
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/80 text-gray-700 text-sm">
                    <tr>
                        <th className="px-4 py-3 font-semibold">Ügyfél</th>
                        <th className="px-4 py-3 font-semibold">Kapcsolat</th>
                        <th className="px-4 py-3 font-semibold">Üzenet</th>
                        <th className="px-4 py-3 font-semibold">Érkezett</th>
                        <th className="px-4 py-3 font-semibold">Állapot</th>
                        <th className="px-4 py-3"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white/50">
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" /> Betöltés…
                                </div>
                            </td>
                        </tr>
                    ) : filteredContacts.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                Nincs találat.
                            </td>
                        </tr>
                    ) : (
                        filteredContacts.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50/60">
                                <td className="px-4 py-3">
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-xs text-gray-500">#{c.id.slice(0, 6)}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <div>{c.email}</div>
                                    {c.phone && (
                                        <div className="text-xs text-gray-500">{c.phone}</div>
                                    )}
                                </td>
                                <td
                                    className="px-4 py-3 text-sm text-gray-700 max-w-[220px] truncate"
                                    title={c.message}
                                >
                                    {c.message}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {formatDate(c.created_at)}
                                </td>
                                <td className="px-4 py-3">
                                    <StatusPill status={c.status} />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        className="inline-flex items-center gap-1 text-[#AD4949] hover:underline"
                                        style={{ color: ACCENT }}
                                        onClick={() => onOpen(c)}
                                    >
                                        Megnyitás <ChevronRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
