import { FC } from 'react'
import { Game } from '@types'
import { Table } from '@components'

interface IProps {
    games: Game[]
}
const GamesTable: FC<IProps> = ({ games }) => {
    return (
        <>
            <Table
                active
                headers={['Game Name', 'Joinable']}
                body={[
                    ...games.map((game) => [
                        game.name,
                        game.active ? 'No' : 'Yes',
                    ]),
                ]}
                games={games}
            />
        </>
    )
}

export default GamesTable
