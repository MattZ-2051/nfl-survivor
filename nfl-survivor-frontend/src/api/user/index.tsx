import { createEffect } from 'effector'
import type { User } from '@types/user'
import { get } from '../index'

export const sessionCreateFx = createEffect<void, User>(async () => {
    return { username: 'test' }
})

export const sessionDeleteFx = createEffect<void, null>(async () => {
    return null
})
export const test = () => {
    return get('polls/')
}
