import { GameProfile } from '@types'
import { Axios, AxiosError } from 'axios'
import { createEffect } from 'effector'
import { get, patch, post } from '../methods'

export const getGameProfileFx = createEffect<
    void,
    { profile: GameProfile[] | null },
    AxiosError
>(async () => {
    const response = await get('/api/games/profile/')
    return response.data
})

export const getUsersInGameFx = createEffect<
    { gameId: number },
    { users: GameProfile[] },
    AxiosError
>(async ({ gameId }) => {
    const response = await get(`/api/games/${gameId}/users/`)
    return response.data
})

export const updateGamePickFx = createEffect<
    { newPick: string; gameId: number },
    void,
    AxiosError
>(async ({ newPick, gameId }) => {
    const response = await patch('/api/games/profile/update/', {
        pick: newPick,
        gameId,
    })
    return response.data
})

export const updateGameStatusFx = createEffect<
    { gameId: number },
    void,
    AxiosError
>(async ({ gameId }) => {
    const response = await post('/api/games/profile/update/status/', {
        gameId,
    })
    return response.data
})
