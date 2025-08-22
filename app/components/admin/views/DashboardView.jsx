"use client";

import StatCard from "@/components/admin/StatCard";

export default function DashboardView({ counts }) {
    return (
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

            {/* Stat cards row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard label="Összes" value={counts.total} />
                <StatCard label="Új" value={counts.new} tone="new" />
                <StatCard label="Folyamatban" value={counts.in_review} tone="review" />
                <StatCard label="Válaszolt" value={counts.answered} tone="done" />
            </div>

            <p className="text-gray-600">
                Itt jön majd az Umami analitika (chartok, metrikák, idősorok).
                Később beillesztünk komponenseket, pl. „Pageviews by route”, „Events”, „Referrers”.
            </p>
        </div>
    );
}
