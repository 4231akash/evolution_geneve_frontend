// 'use server';

// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { name, email, phone, country, message } = await request.json();

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: 'Name, Email, and Message are required.' },
//         { status: 400 }
//       );
//     }

//     const nodemailer = await import('nodemailer');

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: `"Evolution Genève Enquiry" <${process.env.EMAIL_SERVER_USER}>`,
//       to: process.env.EMAIL_TO,
//       replyTo: email,
//       subject: `New Enquiry from ${name}`,
//       text: `
//         You have a new enquiry:

//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone || 'Not provided'}
//         Country: ${country || 'Not provided'}

//         Message:
//         ${message}
//       `,
//       html: `
//         <h3>New Enquiry</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
//         <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
//         <p><strong>Country:</strong> ${country || 'Not provided'}</p>
//         <hr>
//         <h4>Message:</h4>
//         <p>${message.replace(/\n/g, '<br>')}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
//   }
// }

"use server";

import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const { name, email, phone, country, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    // Dynamically import nodemailer only on server
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      // service: 'gmail',
      host: "mail.evolutiongeneve.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Load templates
    const templatesDir = path.join(
      process.cwd(),
      "app/api/send-enquiry/templates"
    );
    const adminTemplate = await readFile(
      path.join(templatesDir, "admin-enquiry.html"),
      "utf8"
    );
    const userTemplate = await readFile(
      path.join(templatesDir, "user-confirmation.html"),
      "utf8"
    );

    // Replace placeholders
    const subject = `New Enquiry from ${name}`;
    const ticketId = `EG-${Date.now()}`;
    const year = new Date().getFullYear();

    const adminHtml = adminTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{phone}}/g, phone || "Not provided")
      .replace(/{{subject}}/g, subject)
      .replace(/{{message}}/g, message)
      .replace(
        /{{admin_dashboard_link}}/g,
        process.env.ADMIN_DASHBOARD_URL ||
          "https://instagram.com/evolutiongeneve"
      );

    const userHtml = userTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{subject}}/g, subject)
      .replace(/{{message}}/g, message)
      .replace(/{{ticket_id}}/g, ticketId)
      .replace(
        /{{support_center_link}}/g,
        process.env.SUPPORT_CENTER_URL ||
          "https://instagram.com/evolutiongeneve"
      )
      .replace(
        /{{support_phone}}/g,
        process.env.SUPPORT_PHONE || "+97336440400"
      )
      .replace(
        /{{company_website}}/g,
        process.env.COMPANY_WEBSITE || "https://instagram.com/evolutiongeneve"
      )
      .replace(/{{year}}/g, year);

    // Send to Admin
    await transporter.sendMail({
      from: `"Evolution Genève Enquiry" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject,
      html: adminHtml,
    });

    // Send confirmation to User
    await transporter.sendMail({
      from: `"Evolution Genève" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      subject: `We received your enquiry — Ref: ${ticketId}`,
      html: userHtml,
    });

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
