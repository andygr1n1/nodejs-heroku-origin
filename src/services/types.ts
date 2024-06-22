import { z } from 'zod'

export const tokenSchema = z.object({ accessToken: z.string().min(1), refreshToken: z.string().min(1) })
export type ITokensSchema = z.infer<typeof tokenSchema>

/*  */

export const envSchema = z.object({
    X_API_KEY: z.string().min(1, 'X_API_KEY HAS BEEN BROKEN'),
    PORT: z.string().optional(),
    BUNNY_STORAGE_ACCESS_KEY: z.string().min(1, 'BUNNY_STORAGE_ACCESS_KEY HAS BEEN BROKEN'),
    BUNNY_STORAGE_URL_KZEN: z.string().min(1, 'BUNNY_STORAGE_URL_KZEN HAS BEEN BROKEN'),
    VITE_CLIENT_ENDPOINT: z.string().min(1, 'VITE_CLIENT_ENDPOINT HAS BEEN BROKEN'),
    VITE_X_HASURA_ADMIN_SECRET: z.string().min(1, 'VITE_X_HASURA_ADMIN_SECRET HAS BEEN BROKEN'),
    KZEN_NEW_PASSWORD: z.string().min(1, 'KZEN_NEW_PASSWORD HAS BEEN BROKEN'),
    KZEN_USER_ACTIVATION_PATH: z.string().min(1, 'KZEN_USER_ACTIVATION_PATH HAS BEEN BROKEN'),
    NODEMAILER_EMAIL: z.string().min(1, 'NODEMAILER_EMAIL HAS BEEN BROKEN'),
    VITE_EMAIL_SECURITY_CODE: z.string().min(1, 'VITE_EMAIL_SECURITY_CODE HAS BEEN BROKEN'),
    JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET HAS BEEN BROKEN'),
    JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET HAS BEEN BROKEN'),
})

// export type ValueOf<T> = T[keyof T]

// export const payloadSchema = z.record(z.string())

// export type IPayload = z.infer<typeof payloadSchema>
