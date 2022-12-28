import { FC, useEffect } from 'react'
import type { GameProfile } from '@types'
import { useNavigate } from 'react-router-dom'

interface IProps {
    userProfile: GameProfile | null | undefined
}

const MeDetail: FC<IProps> = ({ userProfile }) => {
    return (
        <div>
            <h1>User Details</h1>
        </div>
    )
}

export default MeDetail
