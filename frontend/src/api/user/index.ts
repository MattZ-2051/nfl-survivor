import { createEffect } from 'effector'
import type { AuthTokens } from '@types'
import { post } from '../methods'
import { AxiosError } from 'axios'

export const signupFx = createEffect<
    { username: string; password: string; confirmPassword: string },
    AuthTokens,
    AxiosError
>(async ({ username, password, confirmPassword }) => {
    const response = await post('/api/auth/signup', {
        username,
        password,
        confirmPassword,
    })
    return response.data
})

export const loginFx = createEffect<
    { username: string; password: string },
    AuthTokens,
    AxiosError
>(async ({ username, password }) => {
    const response = await post('/api/auth/token', { username, password })
    return response.data
})

export const sessionDeleteFx = createEffect<void, null>(() => {
    return null
})

export const refreshTokenFx = createEffect<
    { refreshToken: string },
    AuthTokens,
    AxiosError
>(async ({ refreshToken }) => {
    const response = await post('/api/auth/token/refresh', {
        refresh: refreshToken,
    })
    return response.data
})
