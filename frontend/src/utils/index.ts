import type { StorageTokenData } from '@types'
import jwt_decode from 'jwt-decode'

export const decodeJwtToken = (token: string): Record<string, string> => {
    return jwt_decode(token)
}

export const checkStorage = (): StorageTokenData | null => {
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

export const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
