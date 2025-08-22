"use client";
import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = ["#AD4949", "#3b82f6", "#10b981", "#f59e0b"];

export default function DevicesChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/umami?type=devices")
            .then(async (r) => {
                if (!r.ok) {
                    console.error("Umami API error:", r.status);
                    return [];
                }
                const d = await r.json();
                // ✅ Always normalize to array
                if (Array.isArray(d)) return d;
                if (d.devices) return d.devices;
                return [];
            })
            .then((arr) => setData(arr))
            .catch((err) => {
                console.error("DevicesChart fetch failed", err);
                setData([]);
            });
    }, []);

    return (
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Eszközök</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="y"
                        nameKey="x"
                        innerRadius={50}
                        outerRadius={90}
                        fill="#AD4949"
                        paddingAngle={5}
                    >
                        {Array.isArray(data) &&
                            data.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
