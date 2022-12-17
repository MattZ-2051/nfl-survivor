import { FC } from 'react'
import { useEvent } from 'effector-react'

import { getUsersInGameFx } from '@api'
import { Game } from '@types'

interface IProps {
    game: Game
}
const ActiveGames: FC<IProps> = ({ game }) => {
    const getUsers = useEvent(getUsersInGameFx)
    const handleClick = async () => {
        await getUsers({ gameId: Number.parseInt(game.id, 10) })
    }
    return (
        <div>
            <button onClick={handleClick}>{game.id}</button>
            <h1>{game.name}</h1>
        </div>
    )
}

export default ActiveGames
