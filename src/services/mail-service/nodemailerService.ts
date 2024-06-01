// https://miracleio.me/snippets/use-gmail-with-nodemailer/
import nodemailer from 'nodemailer'

import { createTransporter } from './helpers/createTransporter'

export const sendEmail = async (to: string, link: string) => {
    const transporter = createTransporter()

    const info = await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject: 'KZen Account Restore',
        text: 'Something went wrong, please contact Kzen support',
        html: `
                <div>
                    <h3 style="color:black;">Recovery option is valid 10 minutes. Please follow the link</h3>
                    </br>
                    <h3><a href="${link}">🐰 Follow me 🐰</a></h3>
            `,
    })

    console.info('Message sent: %s', info.messageId)

    console.info('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
