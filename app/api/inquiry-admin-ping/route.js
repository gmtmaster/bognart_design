// /src/app/api/inquiry-admin-ping/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { summary, subject } = await req.json(); // ← accept subject
        const subjectUsed = subject || 'Új árajánlatkérés érkezett';

        const { data, error } = await resend.emails.send({
            from: 'BOGNART <admin@bognart.com>', // verified sender
            to: ['info@bognart.com'],
            subject: subjectUsed,
            text:
                `${subjectUsed}\n\n${summary || ''}\n\n` +
                `Jelentkezz be a dashboardba a részletekért.`,
        });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ ok: true, id: data?.id || null }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), { status: 500 });
    }
}
