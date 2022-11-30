import type { AuthTokens } from '@types'
import jwt_decode from 'jwt-decode'

export const decodeJwtToken = (token: string): Record<string, string> => {
    return jwt_decode(token)
}

export const checkStorage = (): {
    tokenData: Record<string, string>
    authTokens: AuthTokens
} | null => {
    const tokenExist = !!localStorage.getItem('authTokens')
    if (tokenExist) {
        const authTokens = JSON.parse(
            localStorage.getItem('authTokens') as string
        )
        const tokenData = decodeJwtToken(authTokens?.access)
        return { tokenData, authTokens }
    } else {
        return null
    }
}
