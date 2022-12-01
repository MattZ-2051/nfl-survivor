import { createEffect } from 'effector'
import type { User, AuthTokens } from '@types'
import { get, post } from '../index'

export const getUserProfileFx = createEffect(async () => {
    const response = await get('/api/users')
    return response.data
})
