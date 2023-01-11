import { FC, useState } from 'react'

import { Button, ListGroup, Modal } from '@components'
import { GameProfile } from '@types'
import { useEvent } from 'effector-react'
import { removeUsersFx } from '@api'

interface IProps {
    users: GameProfile[]
}
const RemoveUser: FC<IProps> = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const removeUsers = useEvent(removeUsersFx)
    const [usersToRemove, setUsersToRemove] = useState<
        string[] | null | string
    >([])

    const handleRemoveUsers = () => {
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        if (
            usersToRemove &&
            usersToRemove?.length > 0 &&
            Array.isArray(usersToRemove)
        ) {
            removeUsers({ gameId, users: usersToRemove })
            setIsModalOpen(false)
        }
    }

    return (
        <div className="ml-4">
            <Button
                type="primary"
                label="Remove User"
                className="w-[150px]"
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Remove Users"
                buttonTitle="Remove"
                onSubmit={handleRemoveUsers}
            >
                <div className="w-full min-h-[200px] flex items-center">
                    {users && users?.length > 0 ? (
                        <ListGroup
                            items={users.map((user) => user.user.user.username)}
                            active={true}
                            multiple={true}
                            setCurrentPick={setUsersToRemove}
                            selectedPick={usersToRemove}
                        />
                    ) : (
                        <p className="text-2xl text-center w-full">
                            No other users in game
                        </p>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default RemoveUser
