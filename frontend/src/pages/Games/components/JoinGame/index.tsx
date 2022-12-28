import { FC, useState } from 'react'
import { Modal, Button } from '@components'

const JoinGame: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <>
            <Button
                label="Yes"
                type="primary"
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Join Game"
                buttonTitle="Join Game"
            >
                <h1>Modal Content</h1>
            </Modal>
        </>
    )
}

export default JoinGame
