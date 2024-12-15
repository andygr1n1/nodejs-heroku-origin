import { Zerr } from '@/middleware'
import { createTransporter } from '@/services/mail-service'

export const guestEmailTransporter = async ({
    emails: to,
    bookingId,
    language,
}: {
    emails: string[]
    bookingId: string
    language: string
}) => {
    try {
        const transporter = createTransporter()

        const isRussian = language === 'ru'

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to,
            subject: isRussian ? 'Регистрация на свадьбу' : 'Wedding registration',
            text: isRussian ? 'Ваша регистрация подтверждена' : 'Your registration is confirmed',
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
              ${
                  !isRussian
                      ? `
                            <div class="container">
                                <div class="header">
                                    <img src="https://firebunny-storage.b-cdn.net/ourstory/images/dariaandrei.jpeg" width="200" height="200" alt="Wedding Logo">
                                    <h1>Congratulations!</h1>
                                </div>
                                <div class="content">
                                    <h2>Your Registration is Confirmed</h2>
                                    <p>Dear Friend,</p>
                                    <p>Thank you for registering for the wedding. We are thrilled to have you join us on this special day.</p>
                                    <p>Your booking ID is: <span class="booking-id">${bookingId}</span></p>
                                    <p>You can manage your profile here: <a href="https://www.ourstory.cloud?booking=${bookingId}">My profile</a></p>
                                    <p>We look forward to celebrating with you!</p>
                                    <p>Best regards,</p>
                                    <p>Daria ᥫ᭡ Andrei</p>
                                </div>
                                <div class="footer">
                                    <p>&copy; 2025 Wedding Event. All rights reserved.</p>
                                </div>
                            </div>`
                      : `
                            <div class="container">
                                <div class="header">
                                    <img src="https://firebunny-storage.b-cdn.net/ourstory/images/dariaandrei.jpeg" width="200" height="200" alt="Wedding Logo">
                                    <h1>Поздравляем!</h1>
                                </div>
                                <div class="content">
                                    <h2>Ваша регистрация подтверждена</h2>
                                    <p>Дорогой друг,</p>
                                    <p>Спасибо, что вы с нами. Мы рады, что вы присоединились к нам в этот волшебный день.</p>
                                    <p>Ваш регистрационный номер: <span class="booking-id">${bookingId}</span></p>
                                    <p>Вы можете просмотреть ваш профиль: <a href="https://www.ourstory.cloud?booking=${bookingId}">Мой профиль</a></p>
                                    <p>Мы с нетерпением ждем, чтобы встретить вас!</p>
                                    <p>С наилучшими пожеланиями,</p>
                                    <p>Дарья ᥫ᭡ Андрей</p>
                                </div>
                                <div class="footer">
                                    <p>&copy; 2025 Свадьба Дарьи и Андрея. Все права защищены.</p>
                                </div>
                            </div>
                            `
              }
            </body>
            </html>
            `,
        })
    } catch (e) {
        throw Zerr({
            message: 'User registration failed. Email service un unavailable at the moment',
            status: 422,
            path: ['guestEmailTransporter'],
        })
    }
}
