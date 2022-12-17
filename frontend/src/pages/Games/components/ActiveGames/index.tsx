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
            fetchUsers(Number.parseInt(game.id, 10)).then((res) => {
                console.log('res', res)
                if (res?.users) {
                    setGameUsers(res.users)
                }
            })
        }
    }, [game])

    return (
        <>
            <h1>{game.name}</h1>
            <h1>Players</h1>
            {gameUsers
                ? gameUsers.map((user, index) => {
                      return <p key={index}>{user}</p>
                  })
                : null}
        </>
    )
}

export default ActiveGames
