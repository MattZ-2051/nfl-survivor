import { createEvent, createStore } from 'effector'
import { signupFx, sessionDeleteFx, sessionLoginFx } from '@api/user'
import { User } from '@types/user'
import { toast } from 'react-toastify'

signupFx.doneData.watch((result) => {
    console.log('here', result)
    // execute login event here
})

signupFx.failData.watch((error) => {
    const errorMessage = error?.response?.data
    console.log('error', errorMessage, error)
    toast.error('signup error')
    return errorMessage
})

sessionLoginFx.doneData.watch((result) => {
    console.log('here', result)
})

sessionDeleteFx.failData.watch((result) => {
    const errorMessage = error?.response?.data
    console.log('error', errorMessage, error)
    toast.error('signup error')
    return errorMessage
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
