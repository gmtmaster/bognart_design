"use client";


export default function StatCard({ label, value, tone }) {
    const toneClass =
        tone === "new"
            ? "text-amber-800 bg-amber-50"
            : tone === "review"
                ? "text-blue-800 bg-blue-50"
                : tone === "done"
                    ? "text-emerald-800 bg-emerald-50"
                    : "text-gray-800 bg-gray-50";
    return (
        <div className={`rounded-xl border border-gray-200 px-3 py-2 ${toneClass}`}>
            <div className="text-xs uppercase tracking-wide">{label}</div>
            <div className="text-lg font-bold">{value}</div>
        </div>
    );
}