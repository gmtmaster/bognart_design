"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ChevronRight, Paperclip } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { ACCENT } from "@/app/components/admin/constants";
import { deriveSubject, formatDate } from "@/app/components/admin/utils";

import Topbar from "@/app/components/admin/Topbar";
import Sidebar from "@/app/components/admin/Sidebar";
import FilterDropdown from "@/app/components/admin/FilterDropdown";
import SearchInput from "@/app/components/admin/SearchInput";
import StatusPill from "@/app/components/admin/StatusPill";
import DetailsDrawer from "@/app/components/admin/DetailsDrawer";
import ContactDrawer from "@/app/components/admin/ContactDrawer";
import Toast from "@/app/components/admin/Toast";
import OutboxDrawer from "@/app/components/admin/OutboxDrawer";

import DashboardView from "@/app/components/admin/views/DashboardView";
import MessagesView from "@/app/components/admin/views/MessagesView";
import InquiriesView from "@/app/components/admin/views/InquiriesView";

export default function Dashboard({ session }) {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState(null); // inquiry
    const [toast, setToast] = useState(null);
    const [outbox, setOutbox] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [activeView, setActiveView] = useState("dashboard");

    const counts = useMemo(() => ({
        total: inquiries.length,
        new: inquiries.filter((i) => i.status === "new").length,
        in_review: inquiries.filter((i) => i.status === "in_review").length,
        answered: inquiries.filter((i) => i.status === "answered").length,
    }), [inquiries]) || { total: 0, new: 0, in_review: 0, answered: 0 };

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            const [{ data: inq }, { data: con }, { data: out }] = await Promise.all([
                supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
                supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(12),
                supabase.from("outbox_emails").select("*").order("sent_at", { ascending: false }).limit(10),
            ]);

            if (!mounted) return;

            setInquiries(
                (inq || []).map((row) => ({
                    ...row,
                    status: row.status || "new",
                    subject: row.subject ?? deriveSubject(row),
                }))
            );
            setContacts(con || []);
            setOutbox(out || []);
            setLoading(false);
        }

        load();

        const ch1 = supabase
            .channel("inquiries-stream")
            .on("postgres_changes", { event: "*", schema: "public", table: "inquiries" }, load)
            .subscribe();

        const ch2 = supabase
            .channel("contacts-stream")
            .on("postgres_changes", { event: "*", schema: "public", table: "contact_messages" }, load)
            .subscribe();

        const ch3 = supabase
            .channel("outbox-stream")
            .on("postgres_changes", { event: "*", schema: "public", table: "outbox_emails" }, async () => {
                const { data } = await supabase
                    .from("outbox_emails")
                    .select("*")
                    .order("sent_at", { ascending: false })
                    .limit(10);
                setOutbox(data || []);
            })
            .subscribe();

        return () => {
            mounted = false;
            supabase.removeChannel(ch1);
            supabase.removeChannel(ch2);
            supabase.removeChannel(ch3);
        };
    }, []);

    const filtered = useMemo(() => {
        let list = inquiries;
        if (statusFilter !== "all") list = list.filter((i) => i.status === statusFilter);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter((i) =>
                [i.name, i.email, i.phone, i.subject, i.message].some((v) =>
                    v?.toLowerCase().includes(q)
                )
            );
        }
        return list;
    }, [inquiries, query, statusFilter]);



    const updateStatus = async (id, status) => {
        // optimistic update
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

        const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);

        if (error) {
            console.error("[admin] update status failed", error);
            setToast({ type: "error", message: "Állapot frissítése sikertelen." });
        } else {
            setToast({ type: "success", message: "Állapot frissítve." });
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen flex bg-[#f4f1ec]">
            {/* Sidebar - fixed left */}
            <Sidebar
                active={activeView}
                onSelect={setActiveView}
                contacts={contacts}
                outbox={outbox}
                onOpenContact={(c) => setSelectedContact(c)}
                onOpenOutbox={(e) => setSelectedEmail(e)}
            />

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                <Topbar user={session?.user} />

                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    {activeView === "dashboard" && <DashboardView counts={counts}/>}
                    {activeView === "messages" && (
                        <MessagesView
                            contacts={contacts}
                            onOpen={(c) => setSelectedContact(c)}
                        />
                    )}
                    {activeView === "inquiries" && (
                        <InquiriesView
                            loading={loading}
                            inquiries={inquiries}
                            filtered={filtered}
                            counts={counts}   // ✅ make sure this is here
                            statusFilter={statusFilter}
                            onChangeStatusFilter={setStatusFilter}
                            query={query}
                            onChangeQuery={setQuery}
                            onOpenInquiry={(i) => setSelected(i)}
                        />
                    )}
                </main>
            </div>

            {/* Drawers & Toast */}
            <DetailsDrawer
                inquiry={selected}
                onClose={() => setSelected(null)}
                onStatusChange={(status) =>
                    selected ? updateStatus(selected.id, status) : null
                }
                onToast={(t) => setToast(t)}

            />
            <ContactDrawer
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
            />
            <OutboxDrawer
                email={selectedEmail}
                onClose={() => setSelectedEmail(null)}
            />
            <Toast toast={toast} onClose={() => setToast(null)} />
        </div>
    );
}