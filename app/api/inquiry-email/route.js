import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
    buildClientConfirmationHtml,
    buildAdminNotificationHtml
} from "@/app/lib/bognartEmailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const data = await req.json();

        const { name, email } = data;

        // EMAIL 1: kliens automata visszaigazolás
        await resend.emails.send({
            from: "BOGNART <info@bognart.com>",
            to: email, //ügyfel emailcim, amiről kérte az ajanlatot
            subject: "Árajánlatkérés fogadva",
            html: buildClientConfirmationHtml(data)
        });

        // EMAIL 2: admin értesítés
        await resend.emails.send({
            from: "BOGNART <info@bognart.com>",
            to: "csengebog@gmail.com", //admin emailcim
            subject: `Új árajánlat érkezett – ${name}`,
            html: buildAdminNotificationHtml(data)
        });

        return NextResponse.json({ ok: true });

    } catch (err) {
        console.error("Submit error:", err);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
