import { FC, useEffect, useState } from 'react'
import { Table, Switch, Dropdown } from '@components'
import { GameProfile } from '@types'
import PrevPicks from '../PrevPicks'
import { useEvent } from 'effector-react'
import { updateGameStatusFx } from '@api'

interface IProps {
    gameUsers: GameProfile[] | null | undefined
}
const UsersTable: FC<IProps> = ({ gameUsers }) => {
    const update = useEvent(updateGameStatusFx)
    const [selectedFilter, setSelectedFilter] = useState<string>('All')
    const [usersToShow, setUsersToShow] = useState<
        GameProfile[] | null | undefined
    >([])

    const gameWinners = gameUsers && gameUsers.filter((item) => !item.is_loser)
    const gameLosers = gameUsers && gameUsers.filter((item) => item.is_loser)

    const handleClick = () => {
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        update({ gameId })
    }

    useEffect(() => {
        if (selectedFilter === 'Winners') {
            setUsersToShow(gameWinners)
        }

        if (selectedFilter === 'Losers') {
            setUsersToShow(gameLosers)
        }

        if (selectedFilter === 'All') {
            setUsersToShow(gameUsers)
        }
    }, [selectedFilter, gameUsers])

    return (
        <div className="min-h-[400px]">
            <button onClick={handleClick}>Test</button>
            {gameWinners?.length === 1 && gameWinners[0].is_winner && (
                <div className="flex items-center justify-between w-full px-12 text-xl">
                    <p>Game Winner</p>
                    <p>{gameWinners[0].user.user.username}</p>
                </div>
            )}
            <div className="flex justify-between w-full">
                <p>Filter</p>
                <Dropdown
                    selectedItem={selectedFilter}
                    setSelectedItem={setSelectedFilter}
                    items={['Winners', 'Losers', 'All']}
                />
            </div>
            {usersToShow && usersToShow.length > 0 ? (
                <Table
                    headers={['Username', 'Current Pick', 'Previous Picks']}
                    body={[
                        ...usersToShow.map((item, index) => {
                            return [
                                item.user.user.username,
                                item.current_pick
                                    ? item.current_pick.team.team_name
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
                    <h1 className="text-center">None</h1>
                </div>
            )}
        </div>
    )
}

export default UsersTable
