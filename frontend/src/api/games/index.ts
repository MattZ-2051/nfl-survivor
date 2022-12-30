import { createEffect } from 'effector'
import { Game, GameProfile } from '@types'
import { get, post, del } from '../methods'
import { Axios, AxiosError } from 'axios'

export const getGamesFx = createEffect<void, { games: Game[] }, AxiosError>(
    async () => {
        const response = await get('/api/games/')
        return response.data
    }
)

export const getSingleGameFx = createEffect<
    { gameId: number },
    { game: Game },
    AxiosError
>(async ({ gameId }) => {
    const response = await get(`/api/games/${gameId}`)
    return response.data
})

export const createGameFx = createEffect<
    { code: string; name: string },
    { game: Game },
    AxiosError
>(async ({ code, name }) => {
    const response = await post('/api/games/create/', {
        code,
        name,
    })
    return response.data
})

export const joinGameFx = createEffect<
    { code: string },
    { game_id: number },
    AxiosError
>(async ({ code }) => {
    const response = await post('/api/games/join/', {
        code,
    })
    return response.data
})

export const leaveGameFx = createEffect<{ gameId: number }, void, AxiosError>(
    async ({ gameId }) => {
        const response = await del(`/api/games/leave/${gameId}/`)
        return response.data
    }
)
