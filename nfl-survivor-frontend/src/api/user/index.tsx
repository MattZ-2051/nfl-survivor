import { createEffect } from 'effector'
import type { NewUser, User, UserAuth } from '@types/user'
import { get, post } from '../index'

export const signupFx = createEffect<NewUser, User>(
    async ({ username, password, rePassword }) => {
        return await post('/api/auth/signup/', {
            username,
            password,
            re_password: rePassword,
        })
    }
)

export const sessionLoginFx = createEffect<UserAuth, User>(
    async ({ username, password }) => {
        return await post('/api/auth/login/', {
            username,
            password,
        })
    }
)

export const sessionDeleteFx = createEffect<void, null>(() => {})

export const test = async () => {
    return await get('api/test/auth/')
}
