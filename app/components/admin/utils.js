export function deriveSubject(row) {
    if (row.subject && row.subject.trim()) return row.subject;
    const parts = [
        row.package || "Árajánlatkérés",
        row.location?.trim(),
        row.size_text?.trim(),
    ].filter(Boolean);
    return parts.length ? parts.join(" • ") : "Árajánlatkérés";
}


export function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}