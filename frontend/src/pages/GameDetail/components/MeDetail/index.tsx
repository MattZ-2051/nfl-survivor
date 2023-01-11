import { FC } from 'react'
import { Game, GameProfile } from '@types'
import PrevPicks from '../PrevPicks'
import SelectPick from '../SelectPick'
import { Button, Table } from '@components'
import { useEvent, useStore } from 'effector-react'
import { $teams } from '@store'
import { startGameFx } from '@api'
import { toast } from 'react-toastify'
import RemoveUser from '../RemoveUser'

interface IProps {
    userProfile: GameProfile
    gameInfo: Game
    gameUsers: GameProfile[]
}

const MeDetail: FC<IProps> = ({ userProfile, gameInfo, gameUsers }) => {
    const teams = useStore($teams)
    const startGame = useEvent(startGameFx)
    const gameFinished = gameInfo.status === 'finished'
    const isLoser = userProfile.is_loser
    const isOwner = userProfile.is_owner

    const handleStartGame = () => {
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        if (gameInfo.status === 'active') {
            toast.error('Game already started')
            return
        }

        if (gameInfo.status === 'finished') {
            toast.error('Game Finished')
            return
        }
        startGame({ gameId })
    }
    const TableBody = () => {
        return isLoser ? (
            <>
                <p>{"Cannot pick a team you're a loser"}</p>
            </>
        ) : gameFinished ? (
            <>
                <p>Game Finished</p>
            </>
        ) : (
            <>
                {userProfile.current_pick ? (
                    <p>{userProfile.current_pick.team.team_name}</p>
                ) : (
                    <p>Select Pick</p>
                )}
                <div className="ml-4">
                    {teams && userProfile && (
                        <SelectPick
                            prevPicks={userProfile.prev_picks}
                            availablePicks={teams?.filter((team) => {
                                if (
                                    !userProfile?.prev_picks?.some(
                                        (prevPick) =>
                                            prevPick.team.scrapy_id ===
                                            team.scrapy_id
                                    )
                                ) {
                                    return team
                                }
                            })}
                        />
                    )}
                </div>
            </>
        )
    }
    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-[350px]">
                <Table
                    headers={['Current Pick', 'Previous Picks']}
                    body={[
                        [
                            <div
                                key={userProfile.id}
                                className="flex items-center"
                            >
                                {TableBody()}
                            </div>,
                            userProfile.prev_picks &&
                            userProfile.prev_picks.length > 0 ? (
                                <PrevPicks profile={userProfile} />
                            ) : (
                                'No picks made yet'
                            ),
                        ],
                    ]}
                />
                <p className="px-12 pb-12 leading-normal text-justify text-gray-500">
                    {
                        'The deadline for updating a current pick for the current week is an hour before the start of the TNF game. Once past the deadline picks will be locked for this week and added into the previous picks column. If you have lost in the current game updating picks will be disabled.'
                    }
                </p>
            </div>
            {isOwner && (
                <>
                    <h1 className="mb-10">Owner Settings</h1>
                    <div className="px-12 flex items-cen">
                        <div>
                            <Button
                                label="Start Game"
                                type="primary"
                                onClick={handleStartGame}
                                className="w-[150px]"
                            />
                        </div>
                        <div>
                            <RemoveUser
                                users={gameUsers.filter(
                                    (user) =>
                                        user.user.user.username !==
                                        userProfile.user.user.username
                                )}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default MeDetail
