import { refreshTokenFx, getUserProfileFx } from '@api'
import type { User } from '@types'
import { useEvent } from 'effector-react'
import { useEffect } from 'react'

export const useRefreshToken = async (user: User | null) => {
    const refreshToken = useEvent(refreshTokenFx)
    const fourMinutes = 1000 * 60 * 4
    useEffect(() => {
        const interval = setInterval(() => {
            if (user) {
                refreshToken({ refreshToken: user.authTokens.refresh })
            } else {
                return
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [user])
}

export const useGetUserProfile = async (user: User | null) => {
    const getMe = useEvent(getUserProfileFx)
    useEffect(() => {
        if (user) {
            getMe()
        }
        return
    }, [user])
}
