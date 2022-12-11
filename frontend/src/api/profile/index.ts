import { Profile } from '@types'
import { createEffect } from 'effector'
import { get } from '../methods'

export const getUserProfileFx = createEffect<void, Profile>(async () => {
    const response = await get('/api/users/me')
    return response.data
})
