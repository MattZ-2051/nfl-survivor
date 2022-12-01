import { createEffect } from 'effector'
import type { AuthTokens } from '@types'
import { post } from '../index'

export const loginFx = createEffect<
    { username: string; password: string },
    AuthTokens
>(async ({ username, password }) => {
    const response = await post('/api/token/', { username, password })
    return response.data
})

export const sessionDeleteFx = createEffect<void, null>(() => {
    return null
})

export const refreshTokenFx = createEffect<
    { refreshToken: string },
    AuthTokens
>(async ({ refreshToken }) => {
    const response = await post('/api/token/refresh/', {
        refresh: refreshToken,
    })
    return response.data
})
