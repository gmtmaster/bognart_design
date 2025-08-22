"use client";
import { useEffect, useState } from "react";
import { WorldMap } from "react-svg-worldmap";

export default function WorldHeatmap() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/umami?type=countries")
            .then((r) => r.json())
            .then((d) => {
                if (!d || !Array.isArray(d)) return;
                // Umami returns [{ x: "HU", y: 120 }, { x: "US", y: 45 }]
                // react-svg-worldmap expects { country: "HU", value: 120 }
                setData(d.map((c) => ({ country: c.x, value: c.y })));
            })
            .catch((err) => console.error("WorldHeatmap fetch failed", err));
    }, []);

    return (
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Látogatók ország szerint</h3>
            {data.length > 0 ? (
                <WorldMap
                    color="#AD4949"
                    size="responsive"
                    data={data}
                />
            ) : (
                <p className="text-gray-500 text-sm">Nincs adat…</p>
            )}
        </div>
    );
}
