import { GameProfile } from '@types'
import { AxiosError } from 'axios'
import { createEffect } from 'effector'
import { get } from '../methods'

export const getGameProfileFx = createEffect<
    void,
    { profile: GameProfile | null },
    AxiosError
>(async () => {
    const response = await get('/api/games/profile/')
    console.log('res', response.data)
    return response.data
})
