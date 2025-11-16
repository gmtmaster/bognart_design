// app/api/admin/reply/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildReplyHtml, buildPlainText } from '@/app/lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            to,               // string | string[] — customer's email (the one who wrote in)
            subject,          // string
            message,          // string
            footerNote,       // optional
            attachments = [], // optional: [{ filename, path|content, mime? }]
        } = body || {};

        if (!to || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing fields (to, subject, message required).' },
                { status: 400 }
            );
        }

        const brandName = process.env.BRAND_NAME || 'BOGNART';
        const brandUrl  = process.env.BRAND_URL  || 'https://bognart.com';

        const html = buildReplyHtml({ brandName, brandUrl, subject, message, footerNote });
        const text = buildPlainText({ brandName, subject, message });

        // 🔒 Fixed sender + friendly name. Ensure `info@bognart.com` is verified in Resend.
        const from = 'BOGNART <info@bognart.com>';

        // Optional: make replies land in the same inbox
        const reply_to = 'info@bognart.com';

        const res = await resend.emails.send({
            from,
            to,
            subject,
            html,
            text,
            reply_to,
            attachments, // passthrough
        });

        return NextResponse.json({ id: res?.data?.id || null, ok: true });
    } catch (e) {
        console.error('[reply api] error', e);
        return NextResponse.json({ error: 'Send failed.' }, { status: 500 });
    }
}
