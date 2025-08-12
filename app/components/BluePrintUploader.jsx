// components/BlueprintUploader.jsx
'use client';
import React, { useRef, useState } from 'react';

export default function BlueprintUploader({ maxFiles = 3, onChange }) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const ACCEPTED = [
        '.pdf','.png','.jpg','.jpeg','.webp','.svg','.heic',
        '.dxf','.dwg','.zip'
    ];

    function pickFiles() {
        inputRef.current?.click();
    }

    function validateAndAdd(newList) {
        setError('');
        // flatten FileList or array
        const incoming = Array.from(newList || []);
        const combined = [...files, ...incoming];

        if (combined.length > maxFiles) {
            setError(`Legfeljebb ${maxFiles} fájl csatolható.`);
            return;
        }

        // optional: basic type/extension guard (keeps UX clean)
        const allOk = incoming.every(f => {
            const ext = '.' + f.name.split('.').pop().toLowerCase();
            return ACCEPTED.includes(ext);
        });
        if (!allOk) {
            setError('Csak PDF, kép (PNG/JPG/WEBP/SVG/HEIC), DXF/DWG vagy ZIP fájl tölthető fel.');
            return;
        }

        setFiles(combined);
        onChange?.(combined);
    }

    function onInputChange(e) {
        validateAndAdd(e.target.files);
        // reset so same file can be re-selected if removed
        e.target.value = '';
    }

    function onDrop(e) {
        e.preventDefault();
        validateAndAdd(e.dataTransfer.files);
    }

    function onRemove(index) {
        const next = files.filter((_, i) => i !== index);
        setFiles(next);
        onChange?.(next);
    }

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
                Alaprajzok (opcionális) <span className="text-stone-400">(max {maxFiles} fájl)</span>
            </label>

            <div
                onClick={pickFiles}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && pickFiles()}
                className="
          rounded-xl border-2 border-dashed border-stone-300 bg-stone-100
          p-4 text-center cursor-pointer select-none
          hover:bg-stone-100/70 focus:outline-none focus:ring-2 focus:ring-amber-500
        "
            >
                <p className="text-sm text-stone-700">
                    Húzd ide a fájlokat vagy <span className="font-medium text-[#CA8A8A] hover:text-[#AD4949] underline">válaszd ki</span>
                </p>
                <p className="mt-1 text-xs text-stone-500">
                    Engedélyezett: PDF, PNG, JPG, WEBP, SVG, HEIC, DXF, DWG, ZIP
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={ACCEPTED.join(',')}
                    className="hidden"
                    onChange={onInputChange}
                />
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                    {files.map((file, i) => {
                        const ext = file.name.split('.').pop()?.toLowerCase();
                        const isImage = ['png','jpg','jpeg','webp','svg','heic'].includes(ext);

                        return (
                            <li
                                key={i}
                                className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-2"
                            >
                                {isImage ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="h-12 w-12 rounded object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded bg-stone-100 flex items-center justify-center text-stone-500 text-xs">
                                        {ext?.toUpperCase()}
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-stone-800">{file.name}</p>
                                    <p className="text-xs text-stone-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onRemove(i)}
                                    className="text-sm text-stone-600 hover:text-stone-900 underline"
                                >
                                    Eltávolítás
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
