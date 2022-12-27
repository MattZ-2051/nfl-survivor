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
        <div className="flex items-center justify-center w-full h-full p-6">
            <div>
                <h1 className="mb-12 text-center text-white">
                    Your Active Games
                </h1>
                <UserGamesTable games={userGames.map((game) => game.game)} />
                {otherGames && (
                    <div>
                        <h1>Find Other Games to Join</h1>
                        <GamesTable
                            games={games.filter(
                                (game, index) =>
                                    userGames?.[index]?.game?.id !== game.id
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActiveGames
