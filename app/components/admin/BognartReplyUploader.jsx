"use client";

import { useRef, useState } from "react";
import { FileText, X } from "lucide-react";

export default function BognartReplyUploader({ onChange }) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const ACCEPT = [".pdf"];

    function pick() {
        inputRef.current?.click();
    }

    function validateAndAdd(newFiles) {
        let validFiles = [...files];

        for (const f of newFiles) {
            const ext = "." + f.name.split(".").pop().toLowerCase();

            if (!ACCEPT.includes(ext)) {
                setError("Csak PDF fájl csatolható.");
                continue;
            }

            if (f.size > 10 * 1024 * 1024) {
                setError("Egy fájl sem lehet nagyobb 10 MB-nál.");
                continue;
            }

            validFiles.push(f);
        }

        setFiles(validFiles);
        onChange?.(validFiles);
    }

    function onInput(e) {
        const selected = [...e.target.files];
        validateAndAdd(selected);
        e.target.value = "";
    }

    function onDrop(e) {
        e.preventDefault();
        const dropped = [...e.dataTransfer.files];
        validateAndAdd(dropped);
    }

    function remove(index) {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onChange?.(newFiles);
    }

    return (
        <div className="space-y-2">
            <div
                onClick={pick}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                role="button"
                tabIndex={0}
                className="
        border-2 border-dashed border-gray-300 rounded-xl p-4 text-center
        cursor-pointer bg-gray-50 hover:bg-gray-100 transition
        select-none
    "
            >
                <p className="text-sm text-gray-700 pointer-events-none">
                    Húzd ide a PDF-eket vagy{" "}
                    <span className="text-[#AD4949] underline pointer-events-none">válaszd ki</span>
                </p>
                <p className="text-xs text-gray-500 mt-1 pointer-events-none">
                    Csak PDF – max 10 MB / fájl
                </p>

                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    multiple
                    className="hidden"
                    onChange={onInput}
                />
            </div>


            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {files.length > 0 && (
                <div className="space-y-3">
                    {files.map((f, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 border border-gray-200 rounded-lg p-2 bg-white"
                        >
                            <FileText size={32} className="text-gray-500" />

                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-medium text-gray-800">
                                    {f.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {(f.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>

                            <button
                                onClick={() => remove(idx)}
                                className="text-gray-600 hover:text-gray-900 p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
