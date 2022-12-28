import { FC, useEffect, useState } from 'react'
import { useEvent, useStore } from 'effector-react'
import { getSingleGameFx, getUsersInGameFx } from '@api'
import { Header } from '@layout'
import type { Game, GameProfile, Tabs as TabsType } from '@types'
import { Tabs } from '@components'
import TeamsTable from './components/TeamsTable'
import UsersTable from './components/UsersTable'
import MeDetail from './components/MeDetail'
import { $user } from '@store'
import { useNavigate } from 'react-router-dom'

const GameDetail: FC = () => {
    const navigate = useNavigate()
    const getGame = useEvent(getSingleGameFx)
    const getUsers = useEvent(getUsersInGameFx)
    const [gameInfo, setGameInfo] = useState<Game | null>()
    const [gameUsers, setGameUsers] = useState<GameProfile[] | null>()
    const [currentUserGameProfile, setCurrentUserGameProfile] =
        useState<GameProfile | null>()
    const [loading, setLoading] = useState<boolean>(false)
    const currentUser = useStore($user)

    useEffect(() => {
        setLoading(true)
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )

        ;(async () => {
            const [{ game }, { users }] = await Promise.all([
                getGame({ gameId }),
                getUsers({ gameId }),
            ]).finally(() => setLoading(false))
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
            users?.length === 0 || !users
                ? setCurrentUserGameProfile(null)
                : setCurrentUserGameProfile(
                      users.filter(
                          (user) =>
                              user.user.user.username === currentUser?.username
                      ).length > 0
                          ? users.filter(
                                (user) =>
                                    user.user.user.username ===
                                    currentUser?.username
                            )[0]
                          : null
                  )
        })()
    }, [])

    const tabs: TabsType = [
        {
            title: 'NFL Schedule',
            content: <TeamsTable />,
        },
        {
            title: 'Users',
            content: <UsersTable gameUsers={gameUsers} />,
        },
        {
            title: 'Me',
            content: <MeDetail userProfile={currentUserGameProfile} />,
        },
    ]
    return (
        <>
            <Header />
            <div className="flex items-center justify-center w-full h-full">
                {gameInfo && (
                    <div className="w-2/3 py-4">
                        <div className="flex-col w-full p-8 bg-white rounded-lg">
                            <div className="flex items-baseline justify-between">
                                <div className="flex">
                                    <h1>Name:</h1>
                                    <h1 className="ml-4">{gameInfo.name}</h1>
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
