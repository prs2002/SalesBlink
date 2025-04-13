import nodemailer from 'nodemailer';

export const defineEmailJob = (agenda) => {
  agenda.define('send-email', async (job) => {
    const { to, subject, html } = job.attrs.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // Your Gmail
        pass: process.env.EMAIL_PASS,     // App Password
      },
    });

    await transporter.sendMail({
      from: `"SalesBot 👻" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to}`);
  });
};