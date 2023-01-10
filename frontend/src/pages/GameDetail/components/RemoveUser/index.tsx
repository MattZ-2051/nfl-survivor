import { FC, useState } from 'react'

import { Button, Input, ListGroup, Modal } from '@components'
import { GameProfile } from '@types'

interface IProps {
    users: GameProfile[]
}
const RemoveUser: FC<IProps> = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleRemoveUsers = () => {}

    return (
        <div className="mt-4">
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
