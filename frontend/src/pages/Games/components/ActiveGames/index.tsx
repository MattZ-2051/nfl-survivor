import { FC } from 'react'
import { Game } from '@types'

interface IProps {
    game: Game
}
const ActiveGames: FC<IProps> = ({ game }) => {
    return (
        <>
            <h1>Your Active Games</h1>
            <p>{game.name}</p>
        </>
    )
}

export default ActiveGames
