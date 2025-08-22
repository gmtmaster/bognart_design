"use client";


export default function StatusPill({ status }) {
    const map = {
        new: "bg-amber-100 text-amber-800",
        in_review: "bg-blue-100 text-blue-800",
        answered: "bg-emerald-100 text-emerald-800",
    };
    const label = { new: "Új", in_review: "Folyamatban", answered: "Válaszolt" }[status] || status;
    return <span className={`text-xs px-2 py-1 rounded-full ${map[status] || "bg-gray-100 text-gray-700"}`}>{label}</span>;
}