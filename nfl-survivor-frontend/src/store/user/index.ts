import { createEvent, createStore } from 'effector'
import { sessionCreateFx } from '@api/user'
import { User } from '@types/user'

sessionCreateFx.doneData.watch((result) => {
    loginSuccess(result)
})

sessionCreateFx.failData.watch((error) => {
    console.log('error', error)
})

export const loginSuccess = createEvent<User>()
export const logoutSuccess = createEvent<User | null>()
export const $user = createStore<User | null>(null)
    .on(loginSuccess, (prevState, payload) => {
        return payload
    })
    .reset(logoutSuccess)
