import { createEffect } from 'effector'
import type { User, AuthTokens } from '@types/user'
import { get, post } from '../index'

export const loginFx = createEffect<
    { username: string; password: string },
    AuthTokens
>(async ({ username, password }) => {
    const response = await post('/api/token/', { username, password })
    return response.data
})

export const sessionDeleteFx = createEffect<void, null>(() => {
    localStorage.removeItem('authTokens')
    return null
})

export const test = async () => {
    return await get('api/test/auth/')
}
