import { Game } from '@types'
import { FC } from 'react'

interface IProps {
    game: Game
}
const GameInfo: FC<IProps> = ({ game }) => {
    return (
        <>
            <h1>Game Info</h1>
        </>
    )
}

export default GameInfo
