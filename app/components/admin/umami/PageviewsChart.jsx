"use client";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function PageviewsChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/umami?type=pageviews")
            .then(async (r) => {
                if (!r.ok) {
                    console.error("Umami API error:", r.status);
                    return [];
                }
                const d = await r.json();
                // ✅ Ensure it's always an array
                return Array.isArray(d) ? d : d.pageviews || [];
            })
            .then((arr) => setData(arr))
            .catch((err) => {
                console.error("PageviewsChart fetch failed", err);
                setData([]);
            });
    }, []);

    return (
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Pageviews (idősor)</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#AD4949" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
