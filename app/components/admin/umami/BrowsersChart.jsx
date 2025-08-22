"use client";
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function BrowsersChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/umami?type=browsers")
            .then((r) => r.json())
            .then((d) => setData(d || []));
    }, []);

    return (
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Böngészők</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="y" fill="#AD4949" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
