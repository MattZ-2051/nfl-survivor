import jwt_decode from 'jwt-decode'

export const decodeJwtToken = (token: string): Record<string, string> => {
    return jwt_decode(token)
}
