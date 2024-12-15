import { Zerr } from '@/middleware'
import { createTransporter } from '@/services/mail-service'

export const ownerEmailTransporter = async ({
    emails,
    superUserEmails: to,
    bookingId,
}: {
    superUserEmails: string[]
    emails: string[]
    bookingId: string
}) => {
    try {
        const transporter = createTransporter()

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to,
            subject: 'One more wedding registration',
            text: `One more guest registered: ${emails.join(', ')}`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Wedding registration</title>
                <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                            }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding: 10px 0;
                        }
                        .header img {
                            height:200px;
                            width: 200px;
                            border-radius: 50%;
                        }
                        .header h1 {
                            margin: 0;
                            color: #333;
                        }
                        .content {
                            margin: 20px 0;
                        }
                        .content h2 {
                            color: #333;
                        }
                        .content p {
                            color: #666;
                            line-height: 1.6;
                        }
                        .content .booking-id {
                            font-weight: bold;
                            color: #1db954;
                        }
                        .footer {
                            text-align: center;
                            padding: 20px 0;
                            color: #999;
                        }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://firebunny-storage.b-cdn.net/ourstory/images/dariaandrei.jpeg" width="200" height="200" alt="Wedding Logo">
                        <h1>One more registration</h1>
                    </div>
                    <div class="content">
                        <p>One or more guests registered: ${emails.join(', ')}</p>
                        <p>The booking ID is: <span class="booking-id">${bookingId}</span></p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Wedding Event. Daria ᥫ᭡ Andrei. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        })
    } catch (e) {
        throw Zerr({
            message: 'User registration failed. Email service un unavailable at the moment',
            status: 422,
            path: ['ownerEmailTransporter'],
        })
    }
}
