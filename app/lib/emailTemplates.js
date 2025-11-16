export function buildReplyHtml({ brandName, brandUrl, subject, message, footerNote }) {
    return `<!doctype html>
<html lang="hu">

<head>
  <meta charset="utf-8" />
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${escapeHtml(subject || brandName)}</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #F4F0EE;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* OUTER BG */
    .outer-bg {
      background: rgba(120, 53, 15, 0.12); /* tailwind bg-amber-900/30 */
      width: 100%;
      padding: 40px 0;
    }

    /* CENTER CARD */
    .card-wrapper {
      max-width: 700px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 28px;
      padding: 40px 32px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.08);
    }

    .header {
      text-align: center;
      margin-bottom: 24px;
    }

    .header img {
      width: 160px;
      height: auto;
    }

    .eyebrow {
      font-size: 12px;
      text-transform: uppercase;
      color: #9F6B6B;
      margin: 0 0 6px 0;
      letter-spacing: 0.5px;
      text-align: center;
    }

    h1 {
      margin: 0 0 16px 0;
      font-size: 22px;
      color: #3A1F1F;
      font-weight: 700;
      text-align: center;
    }

    .content {
      font-size: 15px;
      color: #4A2F2F;
      line-height: 1.75;
      white-space: pre-wrap;
    }

    .divider {
      height: 1px;
      background: #E8DCD6;
      margin: 28px 0;
    }

    .footer-note {
      font-size: 13px;
      color: #775A5A;
      line-height: 1.5;
    }

    .signature img {
      margin-top: 20px;
      width: 180px;
      opacity: 0.92;
    }

    .brand {
      margin-top: 20px;
      font-size: 13px;
      color: #9B6C6C;
    }

    .contact-block {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #E9D9D2;
    }

    .contact-title {
      font-size: 16px;
      font-weight: 700;
      color: #3A1F1F;
      margin-bottom: 8px;
    }

    .contact-line {
      font-size: 14px;
      color: #4A2F2F;
      line-height: 1.6;
      margin: 4px 0;
    }

    a {
      color: #AD4949;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>

<body>

  <!-- EMAIL-SAFE TABLE WRAPPER -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="outer-bg">
    <tr>
      <td align="center">

        <div class="card-wrapper">

          <div class="header">
            <img src="https://www.bognart.com/logo.png" alt="BOGNART logo">
          </div>

          <div class="eyebrow">Válasz üzenet</div>

          <h1>${escapeHtml(subject || 'Üzenet')}</h1>

          <div class="content">${linkify(escapeHtml(message || ''))}</div>

          <div class="divider"></div>

          ${footerNote ? `<div class="footer-note">${escapeHtml(footerNote)}</div>` : ''}

          <div class="signature">
            <img src="https://www.bognart.com/_next/image?url=%2Fsignature.png&w=1200&q=75" alt="Aláírás">
          </div>

          <div class="brand">
            — ${escapeHtml(brandName)}<br>
            <a href="${escapeHtml(brandUrl)}" target="_blank">${escapeHtml(brandUrl)}</a>
          </div>

          <div class="contact-block">
            <div class="contact-title">Székhely</div>
            <div class="contact-line">6200, Kiskőrös Petőfi Sándor út 101</div>

            <div style="height:24px"></div>

            <div class="contact-title">Elérhetőség</div>
            <div class="contact-line"><strong>Bognár Csenge</strong></div>
            <div class="contact-line">Bognart Interior Design — ügyvezető, belsőépítész</div>

            <div class="contact-line" style="margin-top:12px;">
              Tel: <a href="tel:+36703398484">+36 70 339 8484</a>
            </div>

            <div class="contact-line">
              Email: <a href="mailto:info@bognart.com">info@bognart.com</a>
            </div>
          </div>

        </div>

      </td>
    </tr>
  </table>

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

// Convert raw URLs/emails in text to clickable <a>
function linkify(text='') {
    const urlRe = /(https?:\/\/[^\s<]+[^<.)\s])/g;
    const emailRe = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

    return text
        .replace(urlRe, '<a href="$1" target="_blank" rel="noreferrer">$1</a>')
        .replace(emailRe, '<a href="mailto:$1">$1</a>')
        .replace(/\n/g, '<br/>');
}

export function buildClientConfirmationHtml(data) {

    const intro = `
    Kedves ${escapeHtml(data.name)}!<br><br>
    Köszönjük, hogy kitöltötted az árajánlatkérő űrlapunkat, hamarosan jelentkezünk!
  `;

    const details = `
    <div style="margin-top:24px; font-size:15px; color:#4A2F2F;">
      <strong>Név:</strong> ${escapeHtml(data.name)}<br>
      <strong>Email:</strong> ${escapeHtml(data.email)}<br>
      ${data.phone ? `<strong>Telefon:</strong> ${escapeHtml(data.phone)}<br>` : ""}
      ${data.packageName ? `<strong>Választott csomag:</strong> ${escapeHtml(data.packageName)}<br>` : ""}
      ${data.message ? `<strong>Üzenet:</strong><br>${linkify(escapeHtml(data.message))}` : ""}
    </div>
  `;

    return buildOuterTemplate(intro + details);
}

export function buildAdminNotificationHtml(data) {

    const content = `
    Új árajánlat érkezett!<br><br>

    <strong>Név:</strong> ${escapeHtml(data.name)}<br>
    <strong>Email:</strong> ${escapeHtml(data.email)}<br>
    ${data.phone ? `<strong>Telefon:</strong> ${escapeHtml(data.phone)}<br>` : ""}
    ${data.packageName ? `<strong>Csomag:</strong> ${escapeHtml(data.packageName)}<br>` : ""}
    ${data.message ? `<strong>Üzenet:</strong><br>${linkify(escapeHtml(data.message))}` : ""}
    <br><br>
    Kérlek ellenőrizd az admin felületet.
  `;

    return buildOuterTemplate(content);
}
