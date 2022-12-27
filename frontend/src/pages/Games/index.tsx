import { FC, useEffect, useState } from 'react'
import { Header } from '@layout'
import { useEvent, useStore } from 'effector-react'
import { $gameProfile, $games } from '@store'

import CreateGame from './components/CreateGame'
import ActiveGames from './components/ActiveGames'
import { getGameProfileFx, getGamesFx } from '@api'

const Games: FC = () => {
    const gameProfile = useStore($gameProfile)
    const getGameProfile = useEvent(getGameProfileFx)
    const getGames = useEvent(getGamesFx)
    const [loading, setLoading] = useState<boolean>(false)
    const games = useStore($games)

    useEffect(() => {
        setLoading(true)
        Promise.all([getGames(), getGameProfile()]).finally(() =>
            setLoading(false)
        )
    }, [])

    return (
        <>
            <Header />
            {!loading && (
                <div className="flex items-center justify-center w-full h-full">
                    {gameProfile ? (
                        <ActiveGames games={games} userGames={gameProfile} />
                    ) : (
                        <div className="p-12">
                            <h1 className="text-4xl text-center text-white">
                                {"Looks like you don't have any active games!"}
                            </h1>
                            <CreateGame games={games} />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Games
