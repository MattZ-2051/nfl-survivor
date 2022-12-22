import { AuthTokens } from '../models'

export type ApiOptions = RequestInit & {
    params?: string | string[][] | Record<string, string> | URLSearchParams
}

export type StorageTokenData = {
    tokenData: Record<string, string>
    authTokens: AuthTokens
}
