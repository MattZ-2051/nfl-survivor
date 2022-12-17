import { FC } from 'react'
import { Header } from '@layout'
import { useStore } from 'effector-react'
import { $profile } from '@store'

import CreateGame from './components/CreateGame'
import ActiveGames from './components/ActiveGames'

const Games: FC = () => {
    const profile = useStore($profile)

    return (
        <>
            <Header />
            <div className="w-full h-full flex justify-center items-center">
                {profile?.games ? (
                    <ActiveGames game={profile.games} />
                ) : (
                    <div className="p-12">
                        <h1 className="text-white text-center">
                            {"Looks like you don't have any active games!"}
                        </h1>
                        <CreateGame />
                    </div>
                )}
            </div>
        </>
    )
}

export default Games
