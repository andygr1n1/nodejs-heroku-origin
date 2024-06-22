import nodemailer from 'nodemailer'

export const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.VITE_EMAIL_SECURITY_CODE,
        },
    })
}
