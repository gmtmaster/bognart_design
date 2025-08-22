"use client";


export default function FilterDropdown({ value, onChange }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
            >
                <option value="all">Összes állapot</option>
                <option value="new">Új</option>
                <option value="in_review">Folyamatban</option>
                <option value="answered">Válaszolt</option>
            </select>
        </div>
    );
}