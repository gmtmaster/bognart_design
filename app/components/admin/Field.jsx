"use client";

import { useState } from "react";

export default function Field({ label, value, copyable }) {
    const [copied, setCopied] = useState(false);

    return (
        <div>
            <div className="text-xs text-gray-500">{label}</div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-800 break-all">{value}</span>
                {copyable && (
                    <button
                        onClick={async () => {
                            await navigator.clipboard.writeText(value || "");
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1000);
                        }}
                        className="text-xs underline text-gray-600"
                    >
                        {copied ? "Másolva" : "Másolás"}
                    </button>
                )}
            </div>
        </div>
    );
}
