type GameStatus = 'upcoming' | 'active' | 'finished'

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
    status: GameStatus
}

export type GameProfile = {
    game: Game
    user: { user: User }
    current_pick: Team | null
    prev_picks: Team[] | null
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

export type TeamSchedule = {
    week: string
    team: string
    result: string
    score: string
}
