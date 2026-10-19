import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log("Nodemail Email tam.");
export async function sendBookingEmail({
  to,
  title,
  hours,
  date,
  time,
  district,
  area,
  address,
  phone,
  total,
}) {
  await transporter.sendMail({
    from: `"Care.io" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Booking Confirmed: ${title}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e9ec;border-radius:12px;overflow:hidden">
        <div style="background:#1479C9;color:#fff;padding:20px 24px">
          <h2 style="margin:0">Booking Confirmed ✅</h2>
        </div>
        <div style="padding:24px;color:#041320">
          <p>Thank you for choosing Care.io. Your payment was received and your booking is confirmed.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#666">Service</td><td><b>${title}</b></td></tr>
            <tr><td style="padding:8px 0;color:#666">Date & Time</td><td>${date} at ${time}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Duration</td><td>${hours} hour(s)</td></tr>
            <tr><td style="padding:8px 0;color:#666">Location</td><td>${address}, ${area}, ${district}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Phone</td><td>${phone}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Total Paid</td><td><b>${total} tk</b></td></tr>
          </table>
          <p style="margin-top:20px;font-size:13px;color:#666">Our team will contact you before the service time.</p>
        </div>
      </div>
    
    `,
  });
}
