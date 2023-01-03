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
    id: number
    game: Game
    user: { user: User }
    current_pick: GamePick | null
    prev_picks: GamePick[] | null
    is_loser: boolean
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
    team_name: string
}

export type TeamSchedule = {
    week: string
    team: string
    result: string
    score: string
}

export type GamePick = {
    id: number
    team: Team
    week: number
    loser: boolean
}
