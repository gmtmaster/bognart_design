"use client";

const NAV = [
    { key: "dashboard", label: "Dashboard" },
    { key: "messages", label: "Üzenetek" },
    { key: "inquiries", label: "Árajánlat kérések" },
];

export default function Sidebar({ active, onSelect }) {
    return (
        <aside className="w-64 h-screen bg-white/90 backdrop-blur-lg border-r border-gray-200 shadow-xl flex flex-col">
            <div className="p-4 font-bold text-lg text-gray-900">BOGNART ADMIN</div>
            <nav className="flex-1 px-2 space-y-1">
                {NAV.map((item) => {
                    const isActive = active === item.key;
                    return (
                        <button
                            key={item.key}
                            onClick={() => onSelect(item.key)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition ${
                                isActive
                                    ? "bg-gray-900 text-white"
                                    : "hover:bg-gray-100 text-gray-800"
                            }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            <div className="p-4 text-xs text-gray-500">© 2025 Bognart Design</div>
        </aside>
    );
}
