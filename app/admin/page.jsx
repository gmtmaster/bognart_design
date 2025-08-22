"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Dashboard from "@/app/components/admin/Dashboard";
import { Loader2 } from "lucide-react";
import { ACCENT } from "@/app/components/admin/constants";

export default function AdminPage() {
    return (
        <AuthGate>
            {(session) => (
                <Dashboard
                    session={session}
                    onSignOut={async () => {
                        await supabase.auth.signOut();
                        window.location.href = "/admin"; // redirect back to login
                    }}
                />
            )}
        </AuthGate>
    );
}

/* -------------------- AuthGate -------------------- */
function AuthGate({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) return;
            setSession(data.session);
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
            setSession(sess);
        });

        return () => {
            mounted = false;
            listener?.subscription?.unsubscribe?.();
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen grid place-items-center bg-[#f4f1ec]">
                <div className="flex items-center gap-2 text-gray-700">
                    <Loader2 className="animate-spin" /> Betöltés…
                </div>
            </div>
        );
    }

    if (!session) return <LoginForm />;

    return children(session);
}

/* -------------------- LoginForm -------------------- */
function LoginForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // allowed admin emails
        const allowed = ["csengebog@gmail.com", "adamlekrinszki@gmail.com"];
        if (!allowed.includes(email)) {
            setError("Ez az e-mail nincs engedélyezve.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/admin`,
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess("E-mail elküldve! Ellenőrizd a postaládádat a belépéshez.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen grid place-items-center bg-[#f4f1ec] px-4">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-1">Admin belépés</h1>
                <p className="text-center text-gray-600 mb-6">
                    Add meg az e-mail címed, és küldünk egy belépési linket.
                </p>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">E-mail</label>
                        <input
                            type="email"
                            className="w-full rounded-xl border border-gray-300 bg-white/70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl text-white py-2.5 hover:opacity-95 transition flex items-center justify-center gap-2"
                        style={{ backgroundColor: ACCENT }}
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />} Küldés
                    </button>
                </form>
            </div>
        </div>
    );
}
