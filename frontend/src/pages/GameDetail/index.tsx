import { FC, useEffect, useState } from 'react'
import { useEvent } from 'effector-react'
import { getSingleGameFx, getUsersInGameFx } from '@api'
import { Header } from '@layout'

const GameDetail: FC = () => {
    const getGame = useEvent(getSingleGameFx)
    const getUsers = useEvent(getUsersInGameFx)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        Promise.all([getGame({ gameId }), getUsers({ gameId })]).finally(() =>
            setLoading(false)
        )
    }, [])
    return (
        <>
            <Header />
            <div className="w-full h-full flex justify-center items-center">
                {!loading ? <h1>game detail</h1> : <h1>loading...</h1>}
            </div>
        </>
    )
}

export default GameDetail
