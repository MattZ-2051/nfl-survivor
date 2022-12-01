import { createEvent, createStore } from 'effector'
import { loginFx, sessionDeleteFx, refreshTokenFx } from '@api/user'
import { User } from '@types'
import { checkStorage, decodeJwtToken } from '@utils'
import { toast } from 'react-toastify'
import { clearUserProfile } from '../profile'

loginFx.doneData.watch((result) => {
    const tokenData = decodeJwtToken(result.access)
    localStorage.setItem('authTokens', JSON.stringify(result))
    updateUser({ username: tokenData.username, authTokens: result })
    toast.success('Logged In', { toastId: 'logged-in' })
})

loginFx.failData.watch((error) => {
    toast.error('Login Error', {
        toastId: 'login-error',
    })
})

refreshTokenFx.doneData.watch((result) => {
    const tokenData = decodeJwtToken(result.access)
    localStorage.setItem('authTokens', JSON.stringify(result))
    updateUser({ username: tokenData.username, authTokens: result })
})

sessionDeleteFx.doneData.watch(() => {
    clearStorage()
    toast.success('Logged Out', {
        toastId: 'logged-out',
    })
})

const updateUser = createEvent<User>()
export const clearStorage = createEvent<void>()
export const restoreUser = createEvent<void>()

clearStorage.watch(() => {
    localStorage.removeItem('authTokens')
})
restoreUser.watch(() => {
    const userData = checkStorage()
    userData
        ? updateUser({
              username: userData.tokenData.username,
              authTokens: userData.authTokens,
          })
        : clearStorage()
})

export const $user = createStore<User | null>(null)
    .on(updateUser, (prevState, payload) => {
        return payload
    })
    .reset(clearStorage)
