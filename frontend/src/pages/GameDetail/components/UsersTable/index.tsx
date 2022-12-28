import { FC, useEffect, useState } from 'react'
import { Table } from '@components'
import { GameProfile } from '@types'
import PrevPicks from '../PrevPicks'

interface IProps {
    gameUsers: GameProfile[] | null | undefined
}
const UsersTable: FC<IProps> = ({ gameUsers }) => {
    const [selectedPrevPick, setSelectedPrevPick] = useState<string>()

    useEffect(() => {
        if (gameUsers) {
            if (
                gameUsers?.[0]?.prev_picks?.[0]?.scrapy_id &&
                !selectedPrevPick
            ) {
                setSelectedPrevPick(gameUsers[0].prev_picks[0].scrapy_id)
            } else {
                setSelectedPrevPick('None')
            }
        }
    }, [])

    return (
        <div>
            {gameUsers ? (
                <Table
                    headers={['Username', 'Current Pick', 'Previous Picks']}
                    body={[
                        ...gameUsers.map((item, index) => {
                            return [
                                item.user.user.username,
                                item.current_pick
                                    ? item.current_pick?.scrapy_id
                                    : 'None',
                                item.prev_picks &&
                                item.prev_picks.length > 0 ? (
                                    <span key={index}>
                                        <PrevPicks profile={item} />
                                    </span>
                                ) : (
                                    'None'
                                ),
                            ]
                        }),
                    ]}
                />
            ) : (
                <div className="p-12">
                    <h1 className="text-center">
                        No Other Users currently in the Game
                    </h1>
                </div>
            )}
        </div>
    )
}

export default UsersTable
