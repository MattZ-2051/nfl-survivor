import { createEffect } from 'effector'
import type { NewUser, User } from '@types/user'
import { get, post } from '../index'

export const signup = createEffect<NewUser, User>(
    async ({ username, password, rePassword }) => {
        return await post('/api/auth/signup', {
            username,
            password,
            re_password: rePassword,
        })
    }
)

export const sessionDeleteFx = createEffect<void, null>(() => {})

export const test = () => {
    return get('polls/')
}
