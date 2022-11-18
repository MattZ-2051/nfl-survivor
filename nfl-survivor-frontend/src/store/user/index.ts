import { createEvent, createStore } from 'effector'
import { sessionCreateFx, sessionDeleteFx } from '@api/user'
import { User } from '@types/user'
import { decodeJwtToken } from '@utils'

sessionCreateFx.doneData.watch((result) => {
    const tokenData = decodeJwtToken(result.access)
    localStorage.setItem('authTokens', JSON.stringify(result))
    login({ username: tokenData.username, authTokens: result })
})

sessionCreateFx.failData.watch((error) => {
    console.log('error', error)
})

sessionDeleteFx.doneData.watch(() => {
    logout()
})

export const login = createEvent<User>()
export const logout = createEvent<void>()
export const $user = createStore<User | null>(
    localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens') as string)
        : null
)
    .on(login, (prevState, payload) => {
        return payload
    })
    .reset(logout)
