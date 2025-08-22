"use client";


import { Search } from "lucide-react";


export default function SearchInput({ value, onChange }) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Keresés név, e-mail, üzenet…"
                className="w-64 rounded-xl border border-gray-300 bg-white/70 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
            />
        </div>
    );
}