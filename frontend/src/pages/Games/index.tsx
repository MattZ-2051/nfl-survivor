import { FC, useEffect, useState } from 'react'
import { Header } from '@layout'
import { useEvent, useStore } from 'effector-react'
import { $profile, $gameProfile } from '@store'

import CreateGame from './components/CreateGame'
import ActiveGames from './components/ActiveGames'
import { getGameProfileFx } from '@api'

const Games: FC = () => {
    const gameProfile = useStore($gameProfile)
    const getGames = useEvent(getGameProfileFx)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        getGames().finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Header />
            {!loading && (
                <div className="w-full h-full flex justify-center items-center">
                    {gameProfile ? (
                        <ActiveGames game={gameProfile.game} />
                    ) : (
                        <div className="p-12">
                            <h1 className="text-white text-center text-4xl">
                                {"Looks like you don't have any active games!"}
                            </h1>
                            <CreateGame />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Games
