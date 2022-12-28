import { Game } from '@types'
import { FC } from 'react'
import GamesTable from '../GamesTable'

interface IProps {
    games: Game[]
}
const FindGames: FC<IProps> = ({ games }) => {
    return (
        <>
            <h1 className="py-8 text-4xl text-white">Or</h1>
            <h1 className="pb-8 text-4xl text-white">Find a Game to join</h1>
            <GamesTable games={games} />
        </>
    )
}

export default FindGames
