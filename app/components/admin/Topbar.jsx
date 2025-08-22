"use client";


import { LogOut } from "lucide-react";


export default function Topbar({ onSignOut, user }) {
    const displayName =
        user?.user_metadata?.name?.trim() || (user?.email ? user.email.split("@")[0] : "") || "Admin";


    return (
        <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-white/50">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <div className="font-semibold tracking-tight text-gray-900">BOGNART ADMIN</div>
                <div className="flex items-center gap-3">
<span className="hidden sm:inline text-sm text-gray-700">
Üdvözöllek, <span className="font-medium">{displayName}</span>
</span>
                    <button
                        onClick={onSignOut}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
                    >
                        <LogOut size={16} /> Kilépés
                    </button>
                </div>
            </div>
        </header>
    );
}