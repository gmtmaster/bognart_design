"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ toast, onClose }) {
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(onClose, 1800);
        return () => clearTimeout(t);
    }, [toast, onClose]);

    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full shadow-lg text-white ${
                        toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
                    }`}
                >
                    {toast.message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
