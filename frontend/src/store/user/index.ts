import { createEvent, createStore } from 'effector'
import { loginFx, sessionDeleteFx, refreshTokenFx, signupFx } from '@api/user'
import type { AuthTokens, User } from '@types'
import { checkStorage, decodeJwtToken } from '@utils'
import { toast } from 'react-toastify'

signupFx.doneData.watch((result) => {
    toast.success('Signup Successful', {
        toastId: 'signup',
    })
    handleUserTokenData(result)
})

signupFx.failData.watch((error) => {
    const errorMessages = error.response?.data as {
        username: string[]
        password: string[]
    }
    if (errorMessages) {
        if (errorMessages?.password) {
            toast.error(`Password Error: ${errorMessages.password}`, {
                toastId: 'password-error',
            })
        }
        if (errorMessages?.username) {
            toast.error(`Username Error: ${errorMessages.username}`, {
                toastId: 'username-error',
            })
        }
    } else {
        toast.error('Signup Error', { toastId: 'signup-error' })
    }
})

loginFx.doneData.watch((result) => {
    handleUserTokenData(result)
    toast.success('Logged In', { toastId: 'logged-in' })
})

loginFx.failData.watch((error) => {
    toast.error('Login Error', {
        toastId: 'login-error',
    })
})

refreshTokenFx.doneData.watch((result) => {
    handleUserTokenData(result)
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

const handleUserTokenData = (result: AuthTokens) => {
    const tokenData = decodeJwtToken(result.access)
    localStorage.setItem('authTokens', JSON.stringify(result))
    updateUser({ username: tokenData.username, authTokens: result })
}

export const $user = createStore<User | null>(null)
    .on(updateUser, (prevState, payload) => {
        return payload
    })
    .reset(clearStorage)
