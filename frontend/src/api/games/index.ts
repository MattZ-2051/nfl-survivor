import { createEffect } from 'effector'
import { Game } from '@types'
import { get, post } from '../methods'
import { AxiosError } from 'axios'

export const getGamesFx = createEffect<void, { games: Game[] }, AxiosError>(
    async () => {
        const response = await get('/api/games/')
        return response.data
    }
)

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