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
            <div className="w-[500px]">
                <Table
                    headers={['Game Name', 'Joinable']}
                    body={[
                        ...games.map((game) => [
                            game.name,
                            game.active ? 'No' : <JoinGame />,
                        ]),
                    ]}
                />
            </div>
        </>
    )
}

export default GamesTable
