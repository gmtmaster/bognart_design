// app/api/admin/reply/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildReplyHtml, buildPlainText } from '@/lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic allowlist (optional): only allow logged-in admin from your domain to call this.
// You can also check Supabase auth via cookies in a server action if needed.

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            to,              // string | string[]
            subject,         // string
            message,         // string (your typed reply)
            footerNote,      // optional: "Ha kérdése van, erre a levélre válaszolhat."
            attachments = [],// optional: [{ filename, path|content, mime? }]
        } = body || {};

        if (!to || !subject || !message) {
            return NextResponse.json({ error: 'Missing fields (to, subject, message required).' }, { status: 400 });
        }

        const brandName = process.env.BRAND_NAME || 'Studio';
        const brandUrl  = process.env.BRAND_URL  || 'https://example.com';

        const html = buildReplyHtml({ brandName, brandUrl, subject, message, footerNote });
        const text = buildPlainText({ brandName, subject, message });

        const from     = process.env.FROM_EMAIL || 'no-reply@example.com';
        const reply_to = process.env.REPLY_TO   || undefined;

        // Resend supports {content|path} attachments
        const res = await resend.emails.send({
            from,
            to,
            subject,
            html,
            text,
            reply_to,
            attachments, // pass-through
        });

        return NextResponse.json({ id: res?.data?.id || null, ok: true });
    } catch (e) {
        console.error('[reply api] error', e);
        return NextResponse.json({ error: 'Send failed.' }, { status: 500 });
    }
}
