"use client";


import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClientPublic";
import LoginForm from "@/components/admin/LoginForm";


export default function AuthGate({ children }) {
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