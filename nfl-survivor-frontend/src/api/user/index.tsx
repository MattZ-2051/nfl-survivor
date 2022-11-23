import { createEffect } from 'effector'
import type { AuthTokens } from '@types/user'
import { get, post } from '../index'

export const signup = createEffect<
    { username: string; password: string; rePassword: string },
    AuthTokens
>(async ({ username, password, rePassword }) => {
    return await post('/api/auth/signup', {
        username,
        password,
        re_password: rePassword,
    })
})

export const sessionDeleteFx = createEffect<void, null>(() => {})

export const test = () => {
    return get('polls/')
}
