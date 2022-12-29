import { Game } from '@types'
import { FC } from 'react'
import GamesTable from '../GamesTable'

interface IProps {
    games: Game[]
}
const FindGames: FC<IProps> = ({ games }) => {
    return (
        <>
            <div>
                <h1 className="py-8 text-4xl text-center text-white">Or</h1>
                <h1 className="pb-8 text-4xl text-center text-white">
                    Find a Game to join
                </h1>
                <GamesTable games={games} />
            </div>
        </>
    )
}

export default FindGames
