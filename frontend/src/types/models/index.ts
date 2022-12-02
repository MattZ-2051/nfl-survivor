export type AuthTokens = {
    refresh: string
    access: string
}

export type User = {
    username: string
    authTokens: AuthTokens
}

export type Game = {
    name: string
}

export type Profile = {
    games: Game[] | null
    // rest of user profile data including groups etc..
}