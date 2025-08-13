// lib/emailTemplates.js

export function buildReplyHtml({ brandName, brandUrl, subject, message, footerNote }) {
    // Very safe minimal styles (work well in most email clients)
    return `<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8" />
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${escapeHtml(subject || brandName)}</title>
  <style>
    body { margin:0; padding:0; background:#f6f6f6; font-family:ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
    .wrap { max-width:620px; margin:0 auto; padding:24px; }
    .card { background:#ffffff; border-radius:16px; border:1px solid #eee; padding:24px; }
    .logo { font-weight:800; letter-spacing:.2px; font-size:18px; color:#111; text-decoration:none; }
    .eyebrow { font-size:12px; color:#6b7280; margin:0 0 2px; }
    h1 { margin:0 0 12px; font-size:20px; color:#111; }
    .content { color:#374151; line-height:1.7; font-size:15px; white-space:pre-wrap; }
    .footer { margin-top:16px; font-size:12px; color:#6b7280; }
    .brand { margin-top:16px; font-size:13px; color:#6b7280; }
    .btn { display:inline-block; background:#AD4949; color:#fff !important; text-decoration:none; padding:10px 16px; border-radius:10px; font-weight:600; }
    a { color:#AD4949; }
  </style>
</head>
<body>
  <div class="wrap">
    <a href="${escapeHtml(brandUrl)}" class="logo" target="_blank" rel="noreferrer">${escapeHtml(brandName)}</a>
    <div class="card">
      <p class="eyebrow">Válasz üzenet</p>
      <h1>${escapeHtml(subject || 'Üzenet')}</h1>
      <div class="content">${linkify(escapeHtml(message || ''))}</div>
      ${
        footerNote
            ? `<div class="footer">${escapeHtml(footerNote)}</div>`
            : ''
    }
      <div class="brand">— ${escapeHtml(brandName)}</div>
    </div>
  </div>
</body>
</html>`;
}

export function buildPlainText({ brandName, subject, message }) {
    const sep = '\n— ' + (brandName || '');
    return `${subject || 'Üzenet'}\n\n${message || ''}${sep}`;
}

// --- tiny helpers (no external deps)
function escapeHtml(s='') {
    return String(s)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;');
}

// Convert raw URLs/emails in text to clickable <a> (keeps minimal safety)
function linkify(text='') {
    const urlRe = /(https?:\/\/[^\s<]+[^<.)\s])/g;
    const emailRe = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    return text
        .replace(urlRe, '<a href="$1" target="_blank" rel="noreferrer">$1</a>')
        .replace(emailRe, '<a href="mailto:$1">$1</a>')
        .replace(/\n/g, '<br/>');
}
