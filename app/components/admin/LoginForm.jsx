"use client";
import { supabase } from "@/lib/supabaseClientPublic";
import { ACCENT } from "@/components/admin/constants";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        setLoading(false);
    };


    return (
        <div className="min-h-screen grid place-items-center bg-[#f4f1ec] px-4">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-1">Admin belépés</h1>
                <p className="text-center text-gray-600 mb-6">Kérjük, jelentkezzen be a vezérlőpulthoz.</p>
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
                    <div>
                        <label className="block text-sm mb-1">Jelszó</label>
                        <input
                            type="password"
                            className="w-full rounded-xl border border-gray-300 bg-white/70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl text-white py-2.5 hover:opacity-95 transition flex items-center justify-center gap-2"
                        style={{ backgroundColor: ACCENT }}
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />} Belépés
                    </button>
                </form>
            </div>
        </div>
    );
}