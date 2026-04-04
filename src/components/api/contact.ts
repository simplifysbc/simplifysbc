import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "your@email.com",   // 🔴 replace
        pass: "yourpassword",     // 🔴 replace
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <your@email.com>`,
      to: "your@email.com",
      subject: "New Contact Form Message",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}