import { refreshTokenFx } from '@api/user'
import { $user } from '@store'
import type { User } from '@types'
import { useEvent, useStore } from 'effector-react'
import { useEffect } from 'react'

export const useRefreshToken = async () => {
    const refreshToken = useEvent(refreshTokenFx)
    const user = useStore<User | null>($user)
    const fourMinutes = 1000 * 60 * 4
    useEffect(() => {
        if (user) {
            const interval = setInterval(() => {
                refreshToken({ refreshToken: user.authTokens.refresh })
            }, 2000)
            return () => clearInterval(interval)
        } else {
            return
        }
    }, [])
}
