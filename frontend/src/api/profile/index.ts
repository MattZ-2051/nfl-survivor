import { Profile } from '@types'
import { AxiosError } from 'axios'
import { createEffect } from 'effector'
import { get } from '../methods'

export const getUserProfileFx = createEffect<void, Profile, AxiosError>(
    async () => {
        const response = await get('/api/users/me/')
        return response.data
    }
)
