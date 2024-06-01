export const saveRefreshToken = async (props: { userId: string; refreshToken: string }) => {
    const { userId, refreshToken } = props
    return await upsertRefreshTokenByUserId({ userId, refreshToken })
}
