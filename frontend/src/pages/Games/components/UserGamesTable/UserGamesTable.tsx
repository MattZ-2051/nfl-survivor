import { FC } from 'react'
import type { Game } from '@types'
import { Table } from '@components'
import { capitalizeFirstLetter } from '@utils'

interface IProps {
    games: Game[]
}
const UserGamesTable: FC<IProps> = ({ games }) => {
    return (
        <div>
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
