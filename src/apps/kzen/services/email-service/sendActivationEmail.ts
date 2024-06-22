import { mutation_deleteUser } from '@/apps/kzen/services/graphql-service'
import { Zerr } from '@/middleware'
import { createTransporter } from '@/services/mail-service'

import type { IKzenUser } from '../types'

export const sendActivationEmail = async (props: IKzenUser) => {
    const activationLink = `${process.env.KZEN_USER_ACTIVATION_PATH}?activation=${props.password}`

    try {
        const transporter = createTransporter()

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: props.email,
            subject: 'KZen user registration',
            text: 'Please confirm registration email',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>KZen User Registration Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 10px 0;
                    }
                    .header img {
                        width: 100px;
                        border-radius: 50%;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }
                    .header h1 {
                        margin: 0;
                        color: #333333;
                    }
                    .content {
                        margin: 20px 0;
                    }
                    .content h2 {
                        color: #333333;
                    }
                    .content p {
                        color: #666666;
                        line-height: 1.6;
                    }
                    .content a {
                        color: #ffffff;
                        background: linear-gradient(45deg, #16a34a, #1db954);
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        display: inline-block;
                        margin-top: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                        transition: background 0.3s, box-shadow 0.3s;
                    }
                    .content a:hover {
                        background: linear-gradient(45deg, #1db954, #16a34a);
                        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);                
                    }
                    .footer {
                        text-align: center;
                        padding: 20px 0;
                        color: #999999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://firebunny-storage.b-cdn.net/kzen/utility/kzen-cloud-logo.png" alt="KZen Logo">
                        <h1>Welcome!</h1>
                    </div>
                    <div class="content">
                        <h2>Registration confirmation</h2>
                        <p>Dear ${props.name},</p>
                        <p>thank you for registering with KZen. We are excited to have you on board.</p>
                        <p>Your account has been successfully created, and you just need to confirm your email.</p>
                        <p>Click on <a href="${activationLink}" target="_blank">activation link</a> and start exploring the amazing features we offer.</p>
                        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                        <p>Best regards,</p>
                        <p>the KZen Team</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 KZen. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        })
    } catch (e) {
        await mutation_deleteUser(props.email)
        throw Zerr({
            message: 'User registration failed. Email service un unavailable at the moment',
            status: 422,
            path: ['sendActivationEmail'],
        })
    }
}
