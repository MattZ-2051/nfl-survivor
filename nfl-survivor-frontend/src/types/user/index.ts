export type AuthTokens = {
    refresh: string
    access: string
}

export type User = {
    username: string
    authTokens: AuthTokens
}
