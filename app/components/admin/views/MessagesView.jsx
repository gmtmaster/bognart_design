"use client";

import MessagesTable from "@/app/components/admin/MessagesTable";

export default function MessagesView({ contacts, onOpen }) {
    return <MessagesTable contacts={contacts} onOpen={onOpen} />;
}
