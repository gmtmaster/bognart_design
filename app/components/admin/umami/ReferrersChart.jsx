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

const COLORS = ["#AD4949", "#f59e0b", "#3b82f6", "#10b981", "#6366f1"];

export default function ReferrersChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/umami?type=referrers")
            .then((r) => r.json())
            .then((d) => setData(d || []));
    }, []);

    return (
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Referrerek</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} dataKey="y" nameKey="x" outerRadius={90} fill="#AD4949" label>
                        {data.map((_, i) => (
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
