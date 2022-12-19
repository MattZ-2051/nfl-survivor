export type AuthTokens = {
    refresh: string
    access: string
}

export type User = {
    username: string
    authTokens: AuthTokens
}

export type Game = {
    id: number
    name: string
    current_week: number
    active: boolean
}

export type GameProfile = {
    game: Game
    user: string
    currentPick: Team | null
    prevPicks: Team[] | null
    isLoser: boolean
    is_winner: boolean
}

export type Profile = {
    game_invites: Game | null
    // rest of user profile data including groups etc..
}

export type Team = {
    scrapy_id: string
    schedule: string
    team_data: null | string
}
