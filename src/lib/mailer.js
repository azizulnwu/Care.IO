import nodemailer from "nodemailer";

/* ================= TRANSPORT ================= */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= BRAND ================= */

const BRAND = {
  name: "Care.io",
  blue: "#1479C9",
  green: "#5DA83C",
  navy: "#132e49",
  appUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
  supportEmail: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
  supportPhone: process.env.SUPPORT_PHONE || "",
};

/* ================= HELPERS ================= */

const esc = (v = "") =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// "personal-care" -> "Personal Care"
const prettyService = (s = "") =>
  String(s)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// "2026-11-05" -> { long: "5 November 2026", day: "Thursday" }
const prettyDate = (d) => {
  const date = new Date(`${d}T00:00:00`);
  if (isNaN(date)) return { long: d || "-", day: "" };
  return {
    long: date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    day: date.toLocaleDateString("en-GB", { weekday: "long" }),
  };
};

// "17:26" -> "5:26 PM"
const prettyTime = (t = "") => {
  const [h, m] = String(t).split(":");
  if (h === undefined || m === undefined || isNaN(h)) return t || "-";
  const hour = Number(h);
  return `${hour % 12 || 12}:${m.slice(0, 2)} ${hour >= 12 ? "PM" : "AM"}`;
};

// "ABC ABC" -> "ABC"
const dedupe = (s = "") => {
  const str = String(s).trim();
  const mid = Math.floor(str.length / 2);
  const a = str.slice(0, mid).trim();
  const b = str.slice(mid).trim();
  return a && a === b ? a : str;
};

/* ================= TEMPLATE ================= */

function buildHtml({ to, name, booking }) {
  const service = prettyService(booking.category);
  const date = prettyDate(booking.date);
  const time = prettyTime(booking.time);
  const hours = `${booking.hours} ${Number(booking.hours) === 1 ? "hour" : "hours"}`;
  const customerAddress = dedupe(booking.address);
  const ctaUrl = `${BRAND.appUrl}/dashboard`;
  const year = new Date().getFullYear();

  const detailRow = (label, value) =>
    value
      ? `<tr>
          <td class="dm-muted dm-border" style="padding:13px 0;border-bottom:1px solid #e8edf3;font-size:13px;color:#6b7c93;width:34%;vertical-align:top;font-family:Arial,Helvetica,sans-serif">${label}</td>
          <td class="dm-text dm-border" style="padding:13px 0;border-bottom:1px solid #e8edf3;font-size:14px;color:#132e49;font-weight:600;vertical-align:top;font-family:Arial,Helvetica,sans-serif">${esc(value)}</td>
        </tr>`
      : "";

  const sectionTitle = (title) =>
    `<div class="dm-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${BRAND.blue};">${title}</div>`;

  const spacer = (h) =>
    `<div style="height:${h}px;line-height:${h}px;font-size:0;">&nbsp;</div>`;

  const step = (num, title, desc) => `
    <tr>
      <td width="40" valign="top" style="padding:0 0 18px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td align="center" valign="middle" width="28" height="28" style="width:28px;height:28px;background:#e7f2fb;border-radius:14px;color:${BRAND.blue};font-size:13px;font-weight:700;font-family:Arial,Helvetica,sans-serif">${num}</td>
        </tr></table>
      </td>
      <td valign="top" style="padding:0 0 18px;font-family:Arial,Helvetica,sans-serif">
        <div class="dm-text" style="font-size:14px;font-weight:700;color:${BRAND.navy}">${title}</div>
        <div class="dm-muted" style="font-size:13px;line-height:20px;color:#6b7c93;margin-top:2px">${desc}</div>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Booking Confirmed - ${BRAND.name}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
    table,td{mso-table-lspace:0;mso-table-rspace:0}
    img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
    body{margin:0!important;padding:0!important;width:100%!important}
    a{text-decoration:none}

    @media only screen and (max-width:620px){
      .container{width:100%!important}
      .px{padding-left:20px!important;padding-right:20px!important}
      .stack{display:block!important;width:100%!important}
      .stack-gap{padding-bottom:10px!important}
      .hero-title{font-size:26px!important;line-height:32px!important}
      .btn-full{display:block!important;width:100%!important}
    }

    @media (prefers-color-scheme:dark){
      .dm-body{background:#0d1620!important}
      .dm-card{background:#16222f!important}
      .dm-soft{background:#1c2b3a!important;border-color:#2a3c4f!important}
      .dm-text{color:#eaf1f8!important}
      .dm-muted{color:#9fb0c3!important}
      .dm-border{border-color:#2a3c4f!important}
    }
  </style>
</head>
<body class="dm-body" style="margin:0;padding:0;background:#eef2f6;">

  <!-- Preheader -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    Your ${esc(service)} on ${esc(date.long)} at ${esc(time)} is confirmed. Booking ref #${esc(booking.ref || "")}.
    &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
  </div>

  <table role="presentation" class="dm-body" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef2f6;">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

          <!-- Brand bar -->
          <tr>
            <td style="border-radius:16px 16px 0 0;overflow:hidden;font-size:0;line-height:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td width="50%" height="5" style="background:${BRAND.blue};height:5px;font-size:0;line-height:0;">&nbsp;</td>
                <td width="30%" height="5" style="background:${BRAND.green};height:5px;font-size:0;line-height:0;">&nbsp;</td>
                <td width="20%" height="5" style="background:${BRAND.navy};height:5px;font-size:0;line-height:0;">&nbsp;</td>
              </tr></table>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td class="dm-card px" align="left" style="background:#ffffff;padding:26px 36px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td class="dm-text" style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:${BRAND.navy};letter-spacing:-0.3px;">
                  Care<span style="color:${BRAND.green};">.io</span>
                </td>
                <td align="right" class="dm-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a99ad;">
                  Booking Confirmation
                </td>
              </tr></table>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td align="center" class="px" bgcolor="${BRAND.navy}" style="background-color:${BRAND.navy};background-image:linear-gradient(135deg,${BRAND.blue} 0%,${BRAND.navy} 100%);padding:40px 36px 38px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td align="center" valign="middle" width="64" height="64" style="width:64px;height:64px;background:${BRAND.green};border-radius:32px;color:#ffffff;font-size:32px;line-height:64px;font-family:Arial,Helvetica,sans-serif;font-weight:700;">&#10003;</td>
              </tr></table>
              <h1 class="hero-title" style="margin:20px 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:36px;font-weight:800;color:#ffffff;">
                Booking Confirmed
              </h1>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;color:#cfe3f5;">
                Hi ${esc(name || "there")}, your care service is booked.
              </p>
              ${
                booking.ref
                  ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px;"><tr>
                      <td style="background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.28);border-radius:999px;padding:7px 16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#ffffff;letter-spacing:1px;">
                        REF &nbsp;<b>#${esc(booking.ref)}</b>
                      </td>
                    </tr></table>`
                  : ""
              }
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="dm-card px" style="background:#ffffff;padding:32px 36px 8px;">

              <!-- Service + schedule card -->
              <table role="presentation" class="dm-soft" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;border:1px solid #e3eaf2;border-radius:12px;">
                <tr>
                  <td style="padding:20px 22px 6px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${BRAND.blue};">Service</div>
                    <div class="dm-text" style="font-size:20px;font-weight:800;color:${BRAND.navy};margin-top:4px;">${esc(service)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 22px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                      <td class="stack stack-gap" width="40%" valign="top" style="font-family:Arial,Helvetica,sans-serif;">
                        <div class="dm-muted" style="font-size:12px;color:#6b7c93;">Date</div>
                        <div class="dm-text" style="font-size:14px;font-weight:700;color:${BRAND.navy};margin-top:2px;">${esc(date.long)}</div>
                        ${date.day ? `<div class="dm-muted" style="font-size:12px;color:#8a99ad;">${esc(date.day)}</div>` : ""}
                      </td>
                      <td class="stack stack-gap" width="30%" valign="top" style="font-family:Arial,Helvetica,sans-serif;">
                        <div class="dm-muted" style="font-size:12px;color:#6b7c93;">Time</div>
                        <div class="dm-text" style="font-size:14px;font-weight:700;color:${BRAND.navy};margin-top:2px;">${esc(time)}</div>
                      </td>
                      <td class="stack" width="30%" valign="top" style="font-family:Arial,Helvetica,sans-serif;">
                        <div class="dm-muted" style="font-size:12px;color:#6b7c93;">Duration</div>
                        <div class="dm-text" style="font-size:14px;font-weight:700;color:${BRAND.navy};margin-top:2px;">${esc(hours)}</div>
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>

              ${spacer(28)}

              <!-- SERVICE LOCATION (area + district) -->
              ${sectionTitle("Service Location")}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">
                ${detailRow("District", booking.district)}
                ${detailRow("Area", booking.area)}
              </table>

              ${spacer(26)}

              <!-- CUSTOMER INFORMATION (user's own details) -->
              ${sectionTitle("Customer Information")}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">
                ${detailRow("Name", name)}
                ${detailRow("Email", to)}
                ${detailRow("Phone", booking.phone)}
                ${detailRow("Address", customerAddress)}
                ${detailRow("Notes", booking.notes)}
              </table>

              ${spacer(26)}

              <!-- Payment -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="dm-soft" style="background:#f0f8ec;border:1px solid #d4ebc7;border-radius:12px;">
                <tr>
                  <td style="padding:18px 22px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#3f7d27;">Amount Paid</div>
                    <div class="dm-text" style="font-size:26px;font-weight:800;color:${BRAND.navy};margin-top:2px;">${esc(booking.totalCost)}</div>
                  </td>
                  <td align="right" style="padding:18px 22px;">
                    <span style="display:inline-block;background:${BRAND.green};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 12px;border-radius:999px;">
                      &#10003; ${esc(booking.paymentStatus || "Paid")}
                    </span>
                  </td>
                </tr>
              </table>

              ${spacer(30)}

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td align="center">
                  <!--[if mso]>
                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${ctaUrl}" style="height:50px;v-text-anchor:middle;width:260px;" arcsize="16%" stroke="f" fillcolor="${BRAND.blue}">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">View My Booking</center>
                  </v:roundrect>
                  <![endif]-->
                  <!--[if !mso]><!-- -->
                  <a href="${ctaUrl}" target="_blank" class="btn-full" style="display:inline-block;background:${BRAND.blue};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:50px;height:50px;width:260px;text-align:center;border-radius:8px;text-decoration:none;">
                    View My Booking
                  </a>
                  <!--<![endif]-->
                </td>
              </tr></table>

              ${spacer(34)}

              <!-- What happens next -->
              <div style="margin-bottom:14px;">${sectionTitle("What happens next")}</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${step(1, "Caregiver assigned", "We match a verified caregiver for your selected area and schedule.")}
                ${step(2, "We'll contact you", "Our team may call you on your phone number to confirm any details.")}
                ${step(3, "Service day", "Your caregiver arrives at the scheduled time.")}
              </table>

            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td class="dm-card px" style="background:#ffffff;padding:4px 36px 34px;">
              <table role="presentation" class="dm-soft" width="100%" cellpadding="0" cellspacing="0" style="background:#eef6fd;border-left:4px solid ${BRAND.blue};border-radius:8px;">
                <tr>
                  <td class="dm-muted" style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:21px;color:#315170;">
                    <b class="dm-text" style="color:${BRAND.navy};">Need to change or cancel?</b><br>
                    Contact us at
                    <a href="mailto:${esc(BRAND.supportEmail)}" style="color:${BRAND.blue};font-weight:700;">${esc(BRAND.supportEmail)}</a>${
                      BRAND.supportPhone
                        ? ` or call <a href="tel:${esc(BRAND.supportPhone)}" style="color:${BRAND.blue};font-weight:700;">${esc(BRAND.supportPhone)}</a>`
                        : ""
                    }. Please include your reference number.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="px" align="center" style="background:${BRAND.navy};border-radius:0 0 16px 16px;padding:28px 36px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">Thank you for choosing Care<span style="color:#9be36f;">.io</span></div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:19px;color:#9fb6cc;margin-top:8px;">
                Reliable, compassionate care &mdash; right at your doorstep.
              </div>
              <div style="height:1px;line-height:1px;background:#2b4766;margin:18px 0;font-size:0;">&nbsp;</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:18px;color:#7f98b0;">
                This is an automated message regarding your booking. Please do not share this email.<br>
                &copy; ${year} Care.io. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
        <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ================= PLAIN TEXT ================= */

function buildText({ to, name, booking }) {
  const service = prettyService(booking.category);
  const date = prettyDate(booking.date);
  const time = prettyTime(booking.time);
  const customerAddress = dedupe(booking.address);

  return `BOOKING CONFIRMED - ${BRAND.name}

Hi ${name || "there"}, your care service is booked.
${booking.ref ? `Reference: #${booking.ref}\n` : ""}
SERVICE
  Service:   ${service}
  Date:      ${date.long}${date.day ? ` (${date.day})` : ""}
  Time:      ${time}
  Duration:  ${booking.hours} hour(s)

SERVICE LOCATION
  District:  ${booking.district || "-"}
  Area:      ${booking.area || "-"}

CUSTOMER INFORMATION
  Name:      ${name || "-"}
  Email:     ${to}
  Phone:     ${booking.phone || "-"}
  Address:   ${customerAddress || "-"}
${booking.notes ? `  Notes:     ${booking.notes}\n` : ""}
AMOUNT PAID: ${booking.totalCost}

View your booking: ${BRAND.appUrl}/dashboard

Need to change or cancel? Contact ${BRAND.supportEmail}${BRAND.supportPhone ? ` or ${BRAND.supportPhone}` : ""}.

Thank you for choosing ${BRAND.name}.`;
}

/* ================= PUBLIC API ================= */

export async function sendBookingConfirmation(data) {
  if (!data?.to) throw new Error("sendBookingConfirmation: 'to' is required");

  const { to, name, booking = {} } = data;
  const service = prettyService(booking.category);
  const date = prettyDate(booking.date);

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
    replyTo: BRAND.supportEmail,
    to,
    subject: `Booking Confirmed: ${service} on ${date.long}`,
    html: buildHtml({ to, name, booking }),
    text: buildText({ to, name, booking }),
  });
}