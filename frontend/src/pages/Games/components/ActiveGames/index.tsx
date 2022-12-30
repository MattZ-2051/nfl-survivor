import { FC } from 'react'
import { Game, GameProfile } from '@types'
import GamesTable from '../GamesTable'
import UserGamesTable from '../UserGamesTable/UserGamesTable'

interface IProps {
    userGames: GameProfile[]
    games: Game[] | null
}
const ActiveGames: FC<IProps> = ({ games, userGames }) => {
    const otherGames =
        games &&
        games.filter((game, index) => userGames?.[index]?.game?.id !== game.id)
            .length > 0

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-6">
            <div className="mt-4">
                <h1 className="mb-12 text-center text-white">
                    Your Active Games
                </h1>
                <UserGamesTable games={userGames.map((game) => game.game)} />
            </div>
            {otherGames && (
                <div className="mt-8">
                    <h1 className="mb-12 text-center text-white">
                        Find Other Games to Join
                    </h1>
                    <GamesTable
                        games={games.filter(
                            (game, index) =>
                                userGames?.[index]?.game?.id !== game.id
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default ActiveGames
