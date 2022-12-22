import { refreshTokenFx, getUserProfileFx } from '@api'
import { restoreUser } from '@store'
import type { StorageTokenData, User, Profile } from '@types'
import { checkStorage } from '@utils'
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

export const useGetUserProfile = async (
    user: User | null,
    profile: Profile | null
) => {
    const getMe = useEvent(getUserProfileFx)
    useEffect(() => {
        if (user && !profile) {
            getMe()
        }
        return
    }, [user])
}

export const useRestoreUser = (): StorageTokenData | null => {
    const restoreUserStore = useEvent(restoreUser)
    restoreUserStore()
    const userData = checkStorage()
    return userData
}

export const useRestoreUserOnMount = async () => {
    const restoreUserStore = useEvent(restoreUser)
    useEffect(() => {
        restoreUserStore()
    }, [])
}
