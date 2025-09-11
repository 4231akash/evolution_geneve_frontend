import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, email, phone, country, message } = await request.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Name, Email, and Message are required.' }, { status: 400 });
        }

        // Create a transporter object using SMTP transport
        // You'll need to configure your email provider's settings here
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email provider's service
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        // Setup email data
        const mailOptions = {
            from: `"Evolution Genève Enquiry" <${process.env.EMAIL_SERVER_USER}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `New Enquiry from ${name}`,
            // We use both text and html for better email client compatibility
            text: `
                You have a new enquiry from the Evolution Genève website:
                
                Name: ${name}
                Email: ${email}
                Phone: ${phone || 'Not provided'}
                Country: ${country || 'Not provided'}
                
                Message:
                ${message}
            `,
            html: `
                <h3>New Enquiry from Evolution Genève Website</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Country:</strong> ${country || 'Not provided'}</p>
                <hr>
                <h4>Message:</h4>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
        
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}