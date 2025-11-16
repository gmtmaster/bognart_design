"use client";

import { useRef, useState } from "react";
import { FileText, X } from "lucide-react";

export default function BognartReplyUploader({ onChange }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const ACCEPT = [".pdf"];

    function pick() {
        inputRef.current?.click();
    }

    function validate(f) {
        setError("");

        if (!f) return;

        const ext = "." + f.name.split(".").pop().toLowerCase();
        if (!ACCEPT.includes(ext)) {
            setError("Csak PDF fájl csatolható.");
            return;
        }

        if (f.size > 10 * 1024 * 1024) {
            setError("A fájl nem lehet nagyobb 10 MB-nál.");
            return;
        }

        setFile(f);
        onChange?.(f);
    }

    function onInput(e) {
        const f = e.target.files?.[0];
        validate(f);
        e.target.value = "";
    }

    function onDrop(e) {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        validate(f);
    }

    function remove() {
        setFile(null);
        onChange?.(null);
    }

    return (
        <div className="space-y-2">
            <div
                onClick={pick}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                className="
                    border-2 border-dashed border-gray-300 rounded-xl p-4 text-center
                    cursor-pointer bg-gray-50 hover:bg-gray-100 transition
                "
            >
                <p className="text-sm text-gray-700">
                    Húzd ide a PDF-et vagy{" "}
                    <span className="text-[#AD4949] underline">válaszd ki</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Csak PDF – max 10 MB
                </p>

                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={onInput}
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {file && (
                <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-2 bg-white">
                    <FileText size={32} className="text-gray-500" />

                    <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-gray-800">
                            {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>

                    <button
                        onClick={remove}
                        className="text-gray-600 hover:text-gray-900 p-1"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
