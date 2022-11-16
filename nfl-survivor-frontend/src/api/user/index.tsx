import { createEffect } from 'effector'
import type { AuthTokens, User } from '@types/user'
import { get, post } from '../index'

export const sessionCreateFx = createEffect<
    { username: string; password: string },
    AuthTokens
>(async ({ username, password }) => {
    const response = await post('/api/token/', { username, password })
    return response.data
})

export const sessionDeleteFx = createEffect<void, null>(async () => {
    return null
})
export const test = () => {
    return get('polls/')
}
