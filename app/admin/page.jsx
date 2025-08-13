'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Ruler,
    Info,
    Tag,
    Mail,
    Search,
    Filter,
    Paperclip,
    FileText,
    Download,
    LogOut,
    CheckCircle,
    Loader2,
    X,
    ChevronRight,
} from 'lucide-react';

/* =============================================
   Admin Dashboard (single-file page)
   Place this file at: app/admin/page.jsx
   Requirements: TailwindCSS, framer-motion, lucide-react, @supabase/supabase-js
   Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
   ============================================= */

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ACCENT = '#AD4949';

export default function AdminPage() {
    return (
        <AuthGate>
            {(session) => <Dashboard session={session} />}
        </AuthGate>
    );
}

/* -------------------- Auth -------------------- */
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

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [contacts, setContacts] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
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
                        className="w-full rounded-xl bg-[#AD4949] text-white py-2.5 hover:opacity-95 transition flex items-center justify-center gap-2"
                        style={{ backgroundColor: ACCENT }}
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />} Belépés
                    </button>
                </form>
            </div>
        </div>
    );
}

/* ------------------ Dashboard ----------------- */
function Dashboard({ session }) {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState(null); // the selected inquiry (object)
    const [toast, setToast] = useState(null);
    const [outbox, setOutbox] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);


    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            const [{ data: inq, error: inqErr }, { data: con, error: conErr }, { data: out, error: outErr }] = await Promise.all([
                supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
                supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(12),
                supabase.from('outbox_emails').select('*').order('sent_at', { ascending: false }).limit(10),
            ]);

            if (inqErr) console.error('[admin] fetch inquiries error', inqErr);
            if (conErr) console.error('[admin] fetch contacts error', conErr);
            if (outErr) console.error('[admin] fetch outbox error', outErr);

            if (!mounted) return;

            setInquiries((inq || []).map((row) => ({
                ...row,
                status: row.status || 'new',
                subject: row.subject ?? deriveSubject(row),
            })));

            setContacts(con || []);
            setOutbox(out || []);
            setLoading(false);
        }

        load();

        const ch1 = supabase
            .channel('inquiries-stream')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, load)
            .subscribe();

        const ch2 = supabase
            .channel('contacts-stream')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, load)
            .subscribe();

        const ch3 = supabase
            .channel('outbox-stream')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'outbox_emails' }, async () => {
                const { data } = await supabase
                    .from('outbox_emails')
                    .select('*')
                    .order('sent_at', { ascending: false })
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
        if (statusFilter !== 'all') list = list.filter((i) => i.status === statusFilter);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter((i) =>
                [i.name, i.email, i.phone, i.subject, i.message].some((v) => v?.toLowerCase().includes(q))
            );
        }
        return list;
    }, [inquiries, query, statusFilter]);

    const counts = useMemo(() => ({
        total: inquiries.length,
        new: inquiries.filter((i) => i.status === 'new').length,
        in_review: inquiries.filter((i) => i.status === 'in_review').length,
        answered: inquiries.filter((i) => i.status === 'answered').length,
    }), [inquiries]);

    // ✅ Update contact status (only 'new' | 'answered' to match your CHECK)
    const updateContactStatus = async (id, status) => {
        // optimistic update
        setContacts(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
        const { error } = await supabase
            .from('contact_messages')
            .update({ status })
            .eq('id', id);
        if (error) {
            console.error('[admin] contact status update failed', error);
            setToast({ type: 'error', message: 'Üzenet státusz frissítése sikertelen.' });
        } else {
            setToast({ type: 'success', message: 'Üzenet státusz frissítve.' });
        }
    };

    const openContact = (c) => setSelectedContact(c);
    const answerContact = (c) => setSelectedContact({ ...c, _focusReply: true });
    const archiveContact = async (c) => {
        if (!confirm('Biztosan archiválod? (A sor törlésre kerül.)')) return;
        const { error } = await supabase.from('contact_messages').delete().eq('id', c.id);
        if (error) {
            console.error('[admin] delete contact failed', error);
            setToast({ type: 'error', message: 'Archiválás sikertelen.' });
        } else {
            setContacts(prev => prev.filter(x => x.id !== c.id));
            setToast({ type: 'success', message: 'Archiválva.' });
        }
    };

    const updateStatus = async (id, status) => {
        // optimistic update
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

        const { error } = await supabase
            .from('inquiries')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('[admin] update status failed', error);
            setToast({ type: 'error', message: 'Állapot frissítése sikertelen.' });
            // revert on failure
            setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status: i.status } : i)));
        } else {
            setToast({ type: 'success', message: 'Állapot frissítve.' });
        }
    };


    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen bg-[#f4f1ec]">
            <Topbar onSignOut={signOut} user={session?.user} />
            <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
                <Sidebar
                    counts={counts}
                    contacts={contacts}
                    onOpenContact={(contact) => setSelectedContact(contact)}
                    onOpenContact={(contact) => setSelectedContact(contact)}
                    onOpenOutbox={(email) => setSelectedEmail(email)}
                />



                <main>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-4 md:p-6"
                    >
                        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                            <div className="flex items-center gap-2 text-gray-900">
                                <h1 className="text-xl md:text-2xl font-bold">Árajánlat-kérések</h1>
                                <span className="text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">{counts.total} db</span>
                            </div>
                            <div className="flex gap-2">
                                <FilterDropdown value={statusFilter} onChange={setStatusFilter} />
                                <SearchInput value={query} onChange={setQuery} />
                            </div>
                        </div>

                        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/80 text-gray-700 text-sm">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Ügyfél</th>
                                    <th className="px-4 py-3 font-semibold">Kapcsolat</th>
                                    <th className="px-4 py-3 font-semibold">Tárgy</th>
                                    <th className="px-4 py-3 font-semibold">Fájlok</th>
                                    <th className="px-4 py-3 font-semibold">Érkezett</th>
                                    <th className="px-4 py-3 font-semibold">Állapot</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                                            <div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Betöltés…</div>
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-10 text-center text-gray-500">Nincs találat.</td>
                                    </tr>
                                ) : (
                                    filtered.map((i) => (
                                        <tr key={i.id} className="hover:bg-gray-50/60">
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{i.name}</div>
                                                <div className="text-xs text-gray-500">#{i.id.slice(0, 6)}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                <div>{i.email}</div>
                                                {i.phone && <div className="text-xs text-gray-500">{i.phone}</div>}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 max-w-[220px] truncate" title={i.subject}>{i.subject}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <div className="flex items-center gap-1 text-gray-700">
                                                    <Paperclip size={16} /> {i.files?.length || 0}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{formatDate(i.created_at)}</td>
                                            <td className="px-4 py-3">
                                                <StatusPill status={i.status} />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    className="inline-flex items-center gap-1 text-[#AD4949] hover:underline"
                                                    style={{ color: ACCENT }}
                                                    onClick={() => setSelected(i)}
                                                >
                                                    Megnyitás <ChevronRight size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </main>
            </div>

            <DetailsDrawer
                inquiry={selected}
                onClose={() => setSelected(null)}
                onStatusChange={(status) => selected && updateStatus(selected.id, status)}
                onToast={(t) => setToast(t)}
            />
            {/* ✅ new contact drawer */}
            <ContactDrawer
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
            />

            <Toast toast={toast} onClose={() => setToast(null)} />
        </div>
    );
}

/* ----------------- UI building blocks ----------------- */
function Topbar({ onSignOut, user }) {
    const displayName = (user?.user_metadata?.name?.trim())
        || (user?.email ? user.email.split('@')[0] : '')
        || 'Admin';

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

// change the function signature
function Sidebar({ counts, contacts, onOpenContact, outbox, onOpenOutbox }) {
    return (
        <aside className="space-y-4">
            <div className="bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl p-4">
                <h3 className="font-semibold mb-3">Összesítés</h3>
                <div className="grid grid-cols-2 gap-3">
                    <StatCard label="Összes" value={counts.total} />
                    <StatCard label="Új" value={counts.new} tone="new" />
                    <StatCard label="Folyamatban" value={counts.in_review} tone="review" />
                    <StatCard label="Válaszolt" value={counts.answered} tone="done" />
                </div>
            </div>


            <MessagesTable contacts={contacts} onOpen={onOpenContact} />
            <OutboxCard outbox={outbox} onOpenEmail={onOpenOutbox} />

        </aside>
    );
}

function MessagesTable({ contacts, onOpen }) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [query, setQuery] = useState("");

    const filteredContacts = useMemo(() => {
        let list = contacts;
        if (statusFilter !== "all") {
            list = list.filter((c) => c.status === statusFilter);
        }
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter((c) =>
                [c.name, c.email, c.message].some((v) => v?.toLowerCase().includes(q))
            );
        }
        return list;
    }, [contacts, statusFilter, query]);


    const loading = false; // Or pass real loading from props

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-4 md:p-6"
        >
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-gray-900">
                    <h1 className="text-xl md:text-2xl font-bold">Üzenetek</h1>
                    <span className="text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
            {contacts.length} db
          </span>
                </div>
                <div className="flex gap-2">
                    <FilterDropdown value={statusFilter} onChange={setStatusFilter} />
                    <SearchInput value={query} onChange={setQuery} />
                </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/80 text-gray-700 text-sm">
                    <tr>
                        <th className="px-4 py-3 font-semibold">Ügyfél</th>
                        <th className="px-4 py-3 font-semibold">Kapcsolat</th>
                        <th className="px-4 py-3 font-semibold">Üzenet</th>
                        <th className="px-4 py-3 font-semibold">Érkezett</th>
                        <th className="px-4 py-3 font-semibold">Állapot</th>
                        <th className="px-4 py-3"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white/50">
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" /> Betöltés…
                                </div>
                            </td>
                        </tr>
                    ) : filteredContacts.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                Nincs találat.
                            </td>
                        </tr>
                    ) : (
                        filteredContacts.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50/60">
                                <td className="px-4 py-3">
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-xs text-gray-500">
                                        #{c.id.slice(0, 6)}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <div>{c.email}</div>
                                    {c.phone && (
                                        <div className="text-xs text-gray-500">{c.phone}</div>
                                    )}
                                </td>
                                <td
                                    className="px-4 py-3 text-sm text-gray-700 max-w-[220px] truncate"
                                    title={c.message}
                                >
                                    {c.message}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {formatDate(c.created_at)}
                                </td>
                                <td className="px-4 py-3">
                                    <StatusPill status={c.status} />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        className="inline-flex items-center gap-1 text-[#AD4949] hover:underline"
                                        style={{ color: ACCENT }}
                                        onClick={() => onOpen(c)}
                                    >
                                        Megnyitás <ChevronRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}



function StatCard({ label, value, tone }) {
    const toneClass =
        tone === 'new' ? 'text-amber-800 bg-amber-50' :
            tone === 'review' ? 'text-blue-800 bg-blue-50' :
                tone === 'done' ? 'text-emerald-800 bg-emerald-50' :
                    'text-gray-800 bg-gray-50';
    return (
        <div className={`rounded-xl border border-gray-200 px-3 py-2 ${toneClass}`}>
            <div className="text-xs uppercase tracking-wide">{label}</div>
            <div className="text-lg font-bold">{value}</div>
        </div>
    );
}

function SearchInput({ value, onChange }) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Keresés név, e-mail, üzenet…"
                className="w-64 rounded-xl border border-gray-300 bg-white/70 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
            />
        </div>
    );
}

function FilterDropdown({ value, onChange }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
            >
                <option value="all">Összes állapot</option>
                <option value="new">Új</option>
                <option value="in_review">Folyamatban</option>
                <option value="answered">Válaszolt</option>
            </select>
        </div>
    );
}

function StatusPill({ status }) {
    const map = {
        new: 'bg-amber-100 text-amber-800',
        in_review: 'bg-blue-100 text-blue-800',
        answered: 'bg-emerald-100 text-emerald-800',
    };
    const label = { new: 'Új', in_review: 'Folyamatban', answered: 'Válaszolt' }[status] || status;
    return (
        <span className={`text-xs px-2 py-1 rounded-full ${map[status] || 'bg-gray-100 text-gray-700'}`}>{label}</span>
    );
}

/* ----------------- Details Drawer ----------------- */
function DetailsDrawer({ inquiry, onClose, onStatusChange, onToast }) {
    const [sending, setSending] = useState(false);
    const [reply, setReply] = useState({ subject: '', message: '' });
    const [status, setStatus] = useState(inquiry?.status || 'new');

    useEffect(() => {
        if (inquiry) {
            setReply({ subject: `Re: ${inquiry.subject ?? 'Árajánlatkérés'}`, message: '' });
            setStatus(inquiry.status || 'new');
        }
    }, [inquiry]);

    // derive services from possible shapes without changing your data model
    const services = useMemo(() => {
        if (!inquiry) return [];
        if (Array.isArray(inquiry.services) && inquiry.services.length) return inquiry.services;
        const out = [];
        if (inquiry.consultation) out.push('Tanácsadás');
        if (inquiry.price_request) out.push('Árajánlatkérés');
        return out;
    }, [inquiry]);

        const sendEmail = async () => {
            if (!inquiry) return;
            if (!inquiry.email) {
                onToast?.({ type: 'error', message: 'Hiányzik az ügyfél e-mail címe.' });
                return;
            }

            setSending(true);
            try {
                const payload = {
                    to: inquiry.email,
                    subject: reply.subject?.trim() || `Re: ${inquiry.subject ?? 'Árajánlatkérés'}`,
                    message: reply.message || '',
                    footerNote: 'Ha kérdése van, erre a levélre válaszolhat.',
                    // Optionally attach a dynamically generated PDF later:
                    // attachments: [{ filename: 'ajanlat.pdf', path: 'https://...' }],
                };

                const r = await fetch('/api/admin/reply', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!r.ok) throw new Error('Send failed');
                onToast?.({ type: 'success', message: 'Válasz elküldve az ügyfélnek.' });
                onStatusChange?.('answered');

                // after successful fetch('/api/admin/reply')
                await supabase.from('outbox_emails').insert({
                    inquiry_id: inquiry?.id ?? null,       // DetailsDrawer-ben
                    contact_id: null,                       // DetailsDrawer-ben
                    to_email: payload.to,
                    subject: payload.subject,
                    message: payload.message,
                    sent_at: new Date().toISOString()
                });

            } catch (e) {
                console.error(e);
                onToast?.({ type: 'error', message: 'Hiba történt az e-mail küldésekor.' });
            } finally {
                setSending(false);
            }
        };

    return (
        <AnimatePresence>
            {inquiry && (
                <motion.aside
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                    className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50"
                >
                    <div className="h-full grid grid-rows-[auto,1fr]">
                        <div className="border-b px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur">
                            <div>
                                <div className="text-sm text-gray-500">#{inquiry.id.slice(0, 8)}</div>
                                <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                            </div>
                            <button
                                className="rounded-full p-2 hover:bg-gray-100"
                                onClick={onClose}
                                aria-label="Bezárás"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-4 space-y-6">
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Kapcsolat</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                    <Field label="E-mail" value={inquiry.email} copyable />
                                    {inquiry.phone && <Field label="Telefon" value={inquiry.phone} />}
                                    <Field label="Érkezett" value={formatDate(inquiry.created_at)} />
                                    <div>
                                        <label className="text-xs text-gray-500">Állapot</label>
                                        <select
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value); onStatusChange?.(e.target.value); }}
                                            className="mt-1 text-sm rounded-lg border border-gray-300 px-2 py-1"
                                        >
                                            <option value="new">Új</option>
                                            <option value="in_review">Folyamatban</option>
                                            <option value="answered">Válaszolt</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* 🔥 ÚJ: Projekt adatok */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-3">Projekt adatok</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <MapPin size={16} className="mt-0.5 text-gray-600" />
                                        <div>
                                            <div className="text-xs text-gray-500">Ingatlan elhelyezkedése</div>
                                            <div className="text-gray-800">{inquiry.location || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Ruler size={16} className="mt-0.5 text-gray-600" />
                                        <div>
                                            <div className="text-xs text-gray-500">Ingatlan mérete</div>
                                            <div className="text-gray-800">{inquiry.size || inquiry.size_text || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Info size={16} className="mt-0.5 text-gray-600" />
                                        <div>
                                            <div className="text-xs text-gray-500">Ingatlan állapota</div>
                                            <div className="text-gray-800">{inquiry.condition || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Tag size={16} className="mt-0.5 text-gray-600" />
                                        <div>
                                            <div className="text-xs text-gray-500">Választott csomag</div>
                                            <div className="text-gray-800">{inquiry.package || '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 🔥 ÚJ: Szolgáltatások + Forrás */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-3">Kért szolgáltatások</h4>
                                {services.length ? (
                                    <div className="flex flex-wrap gap-2">
                                        {services.map((s, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200"
                                            >
                        {s}
                      </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600">—</p>
                                )}
                                <div className="mt-4">
                                    <div className="text-xs text-gray-500">Hol hallott rólunk</div>
                                    <div className="text-sm text-gray-800">{inquiry.ref_source || '-'}</div>
                                </div>
                            </section>

                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Üzenet</h4>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                            </section>

                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-3 flex items-center gap-2"><Paperclip size={18} /> Csatolt fájlok</h4>
                                {inquiry.files?.length ? (
                                    <ul className="space-y-2">
                                        {inquiry.files.map((f, idx) => (
                                            <li key={idx} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-gray-800 overflow-hidden">
                                                    <FileText size={16} />
                                                    <span className="truncate" title={f.name}>{f.name}</span>
                                                </div>
                                                <a
                                                    href={f.url}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 text-[#AD4949] hover:underline"
                                                    rel="noreferrer"
                                                    style={{ color: ACCENT }}
                                                >
                                                    <Download size={16} /> Letöltés
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-600">Nincs csatolmány.</p>
                                )}
                            </section>

                            <section className="bg-white rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-3 flex items-center gap-2"><Mail size={18} /> Válasz e-mailben</h4>
                                <div className="space-y-3">
                                    <input
                                        value={reply.subject}
                                        onChange={(e) => setReply((r) => ({ ...r, subject: e.target.value }))}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                                        placeholder="Tárgy"
                                    />
                                    <textarea
                                        value={reply.message}
                                        onChange={(e) => setReply((r) => ({ ...r, message: e.target.value }))}
                                        rows={6}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                                        placeholder="Üzenet szövege…"
                                    />
                                    <div className="flex items-center justify-between">
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                            <input type="checkbox" className="rounded" />
                                            Ajánlat csatolása (PDF)
                                        </label>
                                        <button
                                            disabled={sending}
                                            onClick={sendEmail}
                                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white"
                                            style={{ backgroundColor: ACCENT }}
                                        >
                                            {sending ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                                            Küldés
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

function ContactDrawer({ contact, onClose, onStatusChange, onToast, accent = '#AD4949' }) {
    const [sending, setSending] = useState(false);
    const [reply, setReply] = useState({ subject: '', message: '' });
    const [status, setStatus] = useState(contact?.status || 'new');
    const replyBoxRef = useRef(null);

    useEffect(() => {
        if (!contact) return;
        setReply({
            subject: `Re: Kapcsolatfelvétel – ${contact.name ?? ''}`.trim(),
            message: ''
        });
        setStatus(contact.status || 'new');
        if (contact._focusReply) {
            setTimeout(() => replyBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
        }
    }, [contact]);

    const sendEmail = async () => {
        if (!contact) return;
        if (!contact.email) {
            onToast?.({ type: 'error', message: 'Hiányzik az e-mail cím.' });
            return;
        }
        setSending(true);
        try {
            const payload = {
                to: contact.email,
                subject: reply.subject?.trim() || `Re: Kapcsolatfelvétel – ${contact.name ?? ''}`.trim(),
                message: reply.message || '',
                footerNote: 'Ha kérdése van, erre a levélre válaszolhat.',
            };

            const r = await fetch('/api/admin/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!r.ok) throw new Error('Send failed');
            onToast?.({ type: 'success', message: 'Válasz elküldve.' });
            onStatusChange?.('answered');


            await supabase.from('outbox_emails').insert({
                inquiry_id: null,
                contact_id: contact?.id ?? null,
                to_email: payload.to,
                subject: payload.subject,
                message: payload.message,
                sent_at: new Date().toISOString()
            });

        } catch (e) {
            console.error(e);
            onToast?.({ type: 'error', message: 'Hiba történt a küldésnél.' });
        } finally {
            setSending(false);
        }
    };


    return (
        <AnimatePresence>
            {contact && (
                <motion.aside
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                    className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50"
                >
                    <div className="h-full grid grid-rows-[auto,1fr]">
                        <div className="border-b px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur">
                            <div>
                                <div className="text-sm text-gray-500">#{contact.id.slice(0, 8)}</div>
                                <h3 className="text-lg font-semibold">{contact.name}</h3>
                            </div>
                            <button className="rounded-full p-2 hover:bg-gray-100" onClick={onClose} aria-label="Bezárás">
                                <X />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-4 space-y-6">
                            {/* Kapcsolat */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Kapcsolat</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                    <Field label="E-mail" value={contact.email} copyable />
                                    {contact.phone && <Field label="Telefon" value={contact.phone} />}
                                    <Field label="Érkezett" value={formatDate(contact.created_at)} />
                                    <div>
                                        <label className="text-xs text-gray-500">Állapot</label>
                                        <select
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value); onStatusChange?.(e.target.value); }}
                                            className="mt-1 text-sm rounded-lg border border-gray-300 px-2 py-1"
                                        >
                                            <option value="new">Új</option>
                                            <option value="answered">Válaszolt</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Üzenet */}
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Üzenet</h4>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                                {contact.user_agent && (
                                    <p className="mt-3 text-xs text-gray-500">UA: {contact.user_agent}</p>
                                )}
                            </section>

                            {/* Válasz */}
                            <section ref={replyBoxRef} className="bg-white rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-3 flex items-center gap-2"><Mail size={18} /> Válasz e-mailben</h4>
                                <div className="space-y-3">
                                    <input
                                        value={reply.subject}
                                        onChange={(e) => setReply((r) => ({ ...r, subject: e.target.value }))}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                                        placeholder="Tárgy"
                                    />
                                    <textarea
                                        value={reply.message}
                                        onChange={(e) => setReply((r) => ({ ...r, message: e.target.value }))}
                                        rows={6}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(173,73,73,0.35)]"
                                        placeholder="Üzenet szövege…"
                                    />
                                    <div className="flex items-center justify-between">
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                            <input type="checkbox" className="rounded" />
                                            Ajánlat csatolása (PDF)
                                        </label>
                                        <button
                                            disabled={sending}
                                            onClick={sendEmail}
                                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white"
                                            style={{ backgroundColor: accent }}
                                        >
                                            {sending ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                                            Küldés
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}


function Field({ label, value, copyable }) {
    const [copied, setCopied] = useState(false);
    return (
        <div>
            <div className="text-xs text-gray-500">{label}</div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-800 break-all">{value}</span>
                {copyable && (
                    <button
                        onClick={async () => {
                            await navigator.clipboard.writeText(value || '');
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1000);
                        }}
                        className="text-xs underline text-gray-600"
                    >
                        {copied ? 'Másolva' : 'Másolás'}
                    </button>
                )}
            </div>
        </div>
    );
}

function Toast({ toast, onClose }) {
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
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full shadow-lg text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}
                >
                    {toast.message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ----------------- Utilities & mock ----------------- */
function deriveSubject(row) {
    if (row.subject && row.subject.trim()) return row.subject;
    const parts = [
        row.package || 'Árajánlatkérés',
        row.location?.trim(),
        row.size_text?.trim()
    ].filter(Boolean);
    return parts.length ? parts.join(' • ') : 'Árajánlatkérés';
}
function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function createMockInquiries() {
    const now = Date.now();
    return [
        {
            id: 'inq_' + Math.random().toString(36).slice(2),
            name: 'Kiss Anna',
            email: 'anna.kiss@example.com',
            phone: '+36 30 123 4567',
            subject: 'Konyha felújítás – családi ház',
            message: 'Üdv! Szeretnénk árajánlatot kérni egy 18 m²-es konyha felújítására. Modern, japandi irány, natúr fa frontok, matt fekete fogantyúk.',
            files: [
                { name: 'alaprajz.pdf', url: '#' },
                { name: 'inspiracio.jpg', url: '#' },
            ],
            status: 'new',
            created_at: now - 1000 * 60 * 60 * 2,
        },
        {
            id: 'inq_' + Math.random().toString(36).slice(2),
            name: 'Szabó Péter',
            email: 'peter.szabo@example.com',
            phone: '',
            subject: 'Nappali és előszoba látványterv',
            message: 'Skandináv stílus, világos terek. Kérem, csatolt képeket nézzék meg. Határidő: 1 hónap.',
            files: [
                { name: 'meretek.xlsx', url: '#' },
            ],
            status: 'in_review',
            created_at: now - 1000 * 60 * 60 * 26,
        },
        {
            id: 'inq_' + Math.random().toString(36).slice(2),
            name: 'Tóth Erika',
            email: 'erika.toth@example.com',
            phone: '+36 20 555 1122',
            subject: 'Teljes lakás belsőépítészeti tervezése',
            message: '70 m²-es lakás teljes tervezéséhez kérnék ajánlatot. 2 szoba + konyha + fürdő. Prémium anyagok, meleg tónusok.',
            files: [],
            status: 'answered',
            created_at: now - 1000 * 60 * 60 * 72,
        },
    ];
}

function OutboxCard({ outbox, onOpenEmail }) {
    return (
        <div className="bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl p-4">
            <h3 className="font-semibold mb-3">Kimenő levelek</h3>
            {(!outbox || outbox.length === 0) ? (
                <p className="text-sm text-gray-600">Még nincs elküldött e-mail.</p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {outbox.map((e) => (
                        <li key={e.id} className="py-2">
                            <button
                                className="w-full text-left group"
                                onClick={() => onOpenEmail?.(e)}
                                title={e.subject}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-medium text-gray-900">
                                            {e.subject}
                                        </div>
                                        <div className="truncate text-xs text-gray-600">
                                            {e.to_email}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 shrink-0">
                                        {formatDate(e.sent_at)}
                                    </div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function OutboxDrawer({ email, onClose }) {
    return (
        <AnimatePresence>
            {email && (
                <motion.aside
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                    className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50"
                >
                    <div className="h-full grid grid-rows-[auto,1fr]">
                        <div className="border-b px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur">
                            <div>
                                <div className="text-sm text-gray-500">Kimenő levél</div>
                                <h3 className="text-lg font-semibold truncate max-w-[20rem]">{email.subject}</h3>
                            </div>
                            <button className="rounded-full p-2 hover:bg-gray-100" onClick={onClose} aria-label="Bezárás">
                                <X />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-4 space-y-6">
                            <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <Field label="Címzett" value={email.to_email} copyable />
                                    <Field label="Küldve" value={formatDate(email.sent_at)} />
                                    {email.inquiry_id && <Field label="Inquiry ID" value={email.inquiry_id} copyable />}
                                    {email.contact_id && <Field label="Contact ID" value={email.contact_id} copyable />}
                                </div>
                            </section>

                            <section className="bg-white rounded-xl border border-gray-200 p-4">
                                <h4 className="font-semibold mb-2">Üzenet</h4>
                                <div className="text-sm text-gray-800 whitespace-pre-wrap">
                                    {email.message}
                                </div>
                            </section>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `Tárgy: ${email.subject}\nCímzett: ${email.to_email}\nKüldve: ${formatDate(email.sent_at)}\n\n${email.message}`
                                        );
                                    }}
                                    className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50"
                                >
                                    Másolás
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
