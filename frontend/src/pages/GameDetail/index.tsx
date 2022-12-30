import { FC, useEffect, useState } from 'react'
import { useEvent, useStore } from 'effector-react'
import { getSingleGameFx, getUsersInGameFx, leaveGameFx } from '@api'
import { Header } from '@layout'
import type { Game, GameProfile, TabsType } from '@types'
import { Button, Tabs } from '@components'
import TeamsTable from './components/TeamsTable'
import UsersTable from './components/UsersTable'
import MeDetail from './components/MeDetail'
import { $gameProfile, $user } from '@store'
import { useNavigate } from 'react-router-dom'

const GameDetail: FC = () => {
    const getGame = useEvent(getSingleGameFx)
    const getUsers = useEvent(getUsersInGameFx)
    const gameProfile = useStore($gameProfile)
    const leaveGame = useEvent(leaveGameFx)
    const [gameInfo, setGameInfo] = useState<Game | null>()
    const [gameUsers, setGameUsers] = useState<GameProfile[] | null>()
    const [currentUserGameProfile, setCurrentUserGameProfile] =
        useState<GameProfile | null>()
    const currentUser = useStore($user)
    const navigate = useNavigate()

    useEffect(() => {
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        ;(async () => {
            const [{ game }, { users }] = await Promise.all([
                getGame({ gameId }),
                getUsers({ gameId }),
            ])
            setGameInfo(game)
            users?.length === 0 || !users
                ? setGameUsers(null)
                : setGameUsers(
                      users.filter(
                          (user) =>
                              user.user.user.username !== currentUser?.username
                      ).length > 0
                          ? users.filter(
                                (user) =>
                                    user.user.user.username !==
                                    currentUser?.username
                            )
                          : null
                  )
        })()
    }, [])

    const handleLeaveGame = () => {
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        leaveGame({ gameId })
        navigate('/games')
    }

    useEffect(() => {
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        gameProfile?.length === 0 || !gameProfile
            ? setCurrentUserGameProfile(null)
            : setCurrentUserGameProfile(
                  gameProfile.filter((user) => user.game.id === gameId).length >
                      0
                      ? gameProfile.filter((user) => user.game.id === gameId)[0]
                      : null
              )
    }, [gameProfile])

    const tabs: TabsType = [
        {
            title: 'NFL Schedule',
            content: <TeamsTable />,
        },
        {
            title: 'Game Info',
            content: <UsersTable gameUsers={gameUsers} />,
        },
        {
            title: 'My Game Profile',
            content: currentUserGameProfile && (
                <MeDetail userProfile={currentUserGameProfile} />
            ),
        },
    ]
    return (
        <>
            <Header />
            <div className="flex items-center justify-center w-full h-full">
                {gameInfo && (
                    <div className="w-2/3 py-4">
                        <div className="flex-col w-full p-12 bg-white rounded-lg">
                            <div className="flex items-baseline justify-between">
                                <div className="flex">
                                    <h1>Name:</h1>
                                    <h1 className="ml-4">{gameInfo.name}</h1>
                                    {!gameInfo.active &&
                                        gameInfo.status !== 'finished' && (
                                            <Button
                                                label="Leave Game"
                                                type="primary"
                                                onClick={handleLeaveGame}
                                                className="ml-4"
                                            />
                                        )}
                                </div>
                                <div className="flex">
                                    <h1>Current Week:</h1>
                                    <h1 className="ml-4">
                                        {gameInfo.current_week}
                                    </h1>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Tabs tabs={tabs} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default GameDetail
