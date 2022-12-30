import { FC } from 'react'
import { Game } from '@types'
import { Table } from '@components'
import JoinGame from '../JoinGame'

interface IProps {
    games: Game[]
}
const GamesTable: FC<IProps> = ({ games }) => {
    return (
        <>
            <Table
                headers={['Game Name', '']}
                body={[
                    ...games.map((game) => [
                        game.name,
                        game.active ? 'No' : <JoinGame />,
                    ]),
                ]}
            />
        </>
    )
}

export default GamesTable
