import { FC } from 'react'
import type { Game } from '@types'
import { Table } from '@components'
import { capitalizeFirstLetter } from '@utils'

interface IProps {
    games: Game[]
}
const UserGamesTable: FC<IProps> = ({ games }) => {
    console.log('games', games)
    return (
        <div className="min-w-[500px]">
            <Table
                active
                headers={['Game Name', 'Game Status']}
                body={[
                    ...games.map((game) => [
                        game.name,
                        capitalizeFirstLetter(game.status),
                    ]),
                ]}
                games={games}
            />
        </div>
    )
}
export default UserGamesTable
