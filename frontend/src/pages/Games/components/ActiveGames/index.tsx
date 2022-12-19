import { FC, useEffect, useState } from 'react'
import { useEvent } from 'effector-react'

import { getUsersInGameFx } from '@api'
import { Game } from '@types'
import { toast } from 'react-toastify'

interface IProps {
    game: Game
}
const ActiveGames: FC<IProps> = ({ game }) => {
    const getUsers = useEvent(getUsersInGameFx)
    const [gameUsers, setGameUsers] = useState<string[]>()

    const fetchUsers = async (gameId: number) => {
        try {
            return await getUsers({ gameId })
        } catch {
            toast.error('Error fetching users from game')
            return
        }
    }
    useEffect(() => {
        if (game?.id) {
            fetchUsers(game.id).then((res) => {
                if (res?.users) {
                    setGameUsers(res.users)
                }
            })
        }
    }, [game?.id])

    return (
        <>
            <h1>Active Games</h1>
            <p>{game.name}</p>
        </>
    )
}

export default ActiveGames
