import { FC, useState } from 'react'
import { Modal, Button, Input } from '@components'
import { useEvent } from 'effector-react'
import { joinGameFx } from '@api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const JoinGame: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [code, setCode] = useState<string>('')
    const joinGame = useEvent(joinGameFx)

    const handleJoinGame = async () => {
        const codeTest = /[0-9]{4}/.test(code) && !!Number(code)
        if (codeTest) {
            joinGame({ code })
            setIsModalOpen(false)
        } else {
            toast.error('Enter a valid 4 digit game code', {
                toastId: 'code-error',
            })
        }
    }
    return (
        <>
            <Button
                label="Join"
                type="primary"
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Join Game"
                buttonTitle="Join Game"
                onSubmit={handleJoinGame}
            >
                <div className="w-full">
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            Enter 4 digit game code and create a game name.
                        </p>
                    </div>
                    <div className="my-8">
                        <Input
                            placeHolder="Game Code"
                            label="Game Code"
                            id="floatingGameCode"
                            onChange={setCode}
                            type="text"
                            maxLength={4}
                        />
                    </div>
                </div>{' '}
            </Modal>
        </>
    )
}

export default JoinGame
