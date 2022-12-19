import { FC, useEffect, useState } from 'react'
import { useEvent } from 'effector-react'

import { getUsersInGameFx } from '@api'
import { Game } from '@types'
import { toast } from 'react-toastify'

interface IProps {
    game: Game
}
const ActiveGames: FC<IProps> = ({ game }) => {
    return (
        <>
            <h1>Active Games</h1>
            <p>{game.name}</p>
        </>
    )
}

export default ActiveGames
