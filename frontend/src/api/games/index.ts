import { createEffect } from 'effector'
import { Game } from '@types'
import { get } from '../methods'

export const getGamesFx = createEffect<void, { games: Game[] }>(async () => {
    const response = await get('/api/games/')
    return response.data
})
