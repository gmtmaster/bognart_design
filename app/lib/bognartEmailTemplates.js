// lib/bognartEmailTemplates.js

// --- MASTER OUTER TEMPLATE (full design) ---
export function buildOuterTemplate(innerHtml) {
    return `<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8" />
  <meta name="x-apple-disable-message-reformatting">
  <title>BOGNART</title>

  <style>
    body {
      margin:0;
      padding:0;
      background:#F4F0EE;
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    }

    .outer-bg {
      background: rgba(120,53,15,0.12);
      width:100%;
      padding:40px 0;
    }

    .card-wrapper {
      max-width:540px;
      background:#fff;
      margin:0 auto;
      padding:40px 32px;
      border-radius:28px;
      box-shadow:0 8px 28px rgba(0,0,0,0.08);
    }

    .header { text-align:center; margin-bottom:24px; }
    .header img { width:160px; height:auto; }

    .signature img {
      margin-top:20px;
      width:180px;
      opacity:.95;
    }

    .contact-block {
      margin-top:32px;
      padding-top:24px;
      border-top:1px solid #E9D9D2;
    }

    .contact-title {
      font-size:16px;
      font-weight:700;
      color:#3A1F1F;
    }

    .contact-line {
      font-size:14px;
      color:#4A2F2F;
      margin:4px 0;
      line-height:1.6;
    }

    a { color:#AD4949; text-decoration:none; font-weight:600; }
  </style>
</head>

<body>

<table width="100%" class="outer-bg" role="presentation">
<tr><td align="center">

<div class="card-wrapper">

  <div class="header">
    <img src="https://www.bognart.com/logo.png" />
  </div>

  ${innerHtml}

  <div class="signature">
    <img src="https://www.bognart.com/_next/image?url=%2Fsignature.png&w=1200&q=75">
  </div>

  <div class="contact-block">
    <div class="contact-title">Székhely</div>
    <div class="contact-line">6200, Kiskőrös Petőfi Sándor út 101</div>

    <div style="height:22px"></div>

    <div class="contact-title">Elérhetőség</div>
    <div class="contact-line"><strong>Bognár Csenge</strong></div>
    <div class="contact-line">Bognart Interior Design — ügyvezető, belsőépítész</div>
    <div class="contact-line">Tel: <a href="tel:+36703398484">+36 70 339 8484</a></div>
    <div class="contact-line">Email: <a href="mailto:info@bognart.com">info@bognart.com</a></div>
  </div>

</div>

</td></tr>
</table>

</body>
</html>`;
}


// --- CLIENT AUTO-CONFIRM EMAIL ---
export function buildClientConfirmationHtml(data) {

    const intro = `
    <h1 style="text-align:center;color:#3A1F1F;">Kedves ${escapeHtml(data.name)}!</h1>
    <p style="font-size:15px;color:#4A2F2F;line-height:1.7;">
      Köszönjük, hogy kitöltötted az árajánlatkérő űrlapunkat, hamarosan jelentkezünk!
    </p>
  `;

    const details = `
    <div style="margin-top:32px;font-size:15px;color:#4A2F2F;line-height:1.7;">
      <strong>Név:</strong> ${escapeHtml(data.name)}<br>
      <strong>Email:</strong> ${escapeHtml(data.email)}<br>
      ${data.phone ? `<strong>Telefon:</strong> ${escapeHtml(data.phone)}<br>` : ""}
      ${data.packageName ? `<strong>Csomag:</strong> ${escapeHtml(data.packageName)}<br>` : ""}
      ${data.message ? `<strong>Üzenet:</strong><br>${linkify(escapeHtml(data.message))}` : ""}
    </div>
  `;

    return buildOuterTemplate(intro + details);
}


// --- ADMIN NOTIFICATION EMAIL ---
export function buildAdminNotificationHtml(data) {

    const content = `
    <h1 style="text-align:center;color:#3A1F1F;">Új árajánlat érkezett</h1>

    <div style="margin-top:24px;font-size:15px;color:#4A2F2F;line-height:1.7;">
      <strong>Név:</strong> ${escapeHtml(data.name)}<br>
      <strong>Email:</strong> ${escapeHtml(data.email)}<br>
      ${data.phone ? `<strong>Telefon:</strong> ${escapeHtml(data.phone)}<br>` : ""}
      ${data.packageName ? `<strong>Csomag:</strong> ${escapeHtml(data.packageName)}<br>` : ""}
      ${data.message ? `<strong>Üzenet:</strong><br>${linkify(escapeHtml(data.message))}` : ""}
      <br><br>Kérlek ellenőrizd az admin felületet.
    </div>
  `;

    return buildOuterTemplate(content);
}


// --- HELPERS ---
function escapeHtml(s='') {
    return String(s)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;');
}

function linkify(text='') {
    const urlRe = /(https?:\/\/[^\s<]+[^<.)\s])/g;
    const emailRe = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

    return text
        .replace(urlRe, '<a href="$1">$1</a>')
        .replace(emailRe, '<a href="mailto:$1">$1</a>')
        .replace(/\n/g, '<br/>');
}
